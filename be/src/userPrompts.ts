import { BASE_PROMPT } from "./prompts";
import { basePrompt as reactBasePrompt } from "./defaults/react";

export const testPromptsArr = [BASE_PROMPT];

export const promptsArr = [
  BASE_PROMPT,
  `       -- Messaging Protocol
            Balance(Target? : string)
            Returns the balance of a target, if a target is not supplied then the balance of the sender of the message must be returned.

            -- Example Action message:
            -- lua
            send({
                Target = "{TokenProcess Identifier}",
                Tags = {
                    Action = "Balance",
                    Target = "{IDENTIFIER}"
                }
            })
            -- Example response message:
            {
                Tags = {
                    Balance = "50",
                    Target = "LcldyO8wwiGDzC3iXzGofdO8JdR4S1_2A6Qtz-o33-0",
                    Ticker = "FUN"
                }
            }
            Balances()
            [Returns the balance of all participants in the token.]

            -- lua
            send({
                Target = "[TokenProcess Identifier]",
                Tags = {
                    Action = "Balances",
                    Limit = 1000, # TODO: Is this necessary if the user is paying for the compute and response?
                    Cursor? = "BalanceIdentifer"
                }
            })
          
            -- Example response message:                
            {
                Data = {
                    "MV8B3MAKTsUOqyCzQ0Tsa2AR3TiWTBU1Dx0xM4MO-f4": 100,
                    "LcldyO8wwiGDzC3iXzGofdO8JdR4S1_2A6Qtz-o33-0": 50
                }
            }
            -- Transfer(Target, Quantity)
            If the sender has a sufficient balance, send the Quantity to the Target, issuing a Credit-Notice to the recipient and a Debit-Notice to the sender. The Credit- and Debit-Notice should forward any and all tags from the original Transfer message with the X- prefix. If the sender has an insufficient balance, fail and notify the sender.

            send({
                Target = "[TokenProcess Identifier]",
                Tags = {
                    { name = "Action", value = "Transfer" },
                    { name = "Recipient", value = "[ADDRESS]" },
                    { name = "Quantity", value = "100" },
                    { name = "X-[Forwarded Tag(s) Name]", value= "[VALUE]" }
                }
            })

            -- If a successful transfer occurs a notification message should be sent if Cast is not set.

            ao.send({
                Target = "[Recipient Address]",
                Tags = {
                    { name = "Action", value = "Credit-Notice" },
                    { name = "Sender", value = "[ADDRESS]" },
                    { name = "Quantity", value = "100"},
                    { name = "X-[Forwarded Tag(s) Name]", value= "[VALUE]" }
                }
            })
            
            -- Recipients will infer from the From-Process tag of the message which tokens they have received.

            -- Get-Info()
            lua
            send({
                Target = "{Token}",
                Tags = {
                    Action = "Info"
                }
            })
            -- Mint() [optional]
            Implementing a Mint action gives the process a way of allowing valid participants to create new tokens.
            lua
              send({
                  Target ="{Token Process}",
                  Tags = {
                      Action = "Mint",
                      Quantity = "1000"
                  }
              })
            -- Subledger Processes
            In order to function appropriately, subledgers must implement the full messaging protocol of token contracts (excluding the Mint action). Subledgers must also implement additional features and spawn parameters for their processes. These modifications are described in the following section.

            --- Spawning Parameters
              Every compliant subledger process must carry the following immutable parameters upon its spawning message:

            --- Tag	Description	Optional?
              Source-Token	The ID of the top-most process that this subledger represents.	❌
              Parent-Token	The ID of the parent process that this subledger is attached to.	❌
              Credit-Notice Handler
              Upon receipt of a Credit-Notice message, a compliant subledger process must check if the process in question is the Parent-Token. If it is, the subledger must increase the balance of the Sender by the specified quantity.

            --- Transfer(Target, Quantity)
              In addition to the normal tags that are passed in the Credit-Notice message to the recipient of tokens, a compliant subledger process must also provide both of the Source-Token and Parent-Token values. This allows the recipient of the Transfer message -- if they trust the Module of the subledger process -- to credit a receipt that is analogous (fungible with) deposits from the Source-Token.

              The modified Credit-Notice should be structured as follows:
              """lua
              ao.send({
                  Target = "[Recipient Address]",
                  Tags = {
                      { name = "Action", value = "Credit-Notice" },
                      { name = "Quantity", value = "100"},
                      { name = "Source-Token", value = "[ADDRESS]" },
                      { name = "Parent-Token", value = "[ADDRESS]" },
                      { name = "X-[Forwarded Tag(s) Name]", value= "[VALUE]" }
                  }
              })"""
            -- Withdraw(Target?, Quantity)
                All subledgers must allow balance holders to withdraw their tokens to the parent ledger. Upon receipt of an Action: Withdraw message, the subledger must send an Action message to its Parent-Ledger, transferring the requested tokens to the caller's address, while debiting their account locally. This transfer will result in a Credit-Notice from the Parent-Ledger for the caller.

            """lua
            send({
                Target = "[TokenProcess Identifier]",
                Tags = {
                { name = "Action", value = "Withdraw" },
                { name = "Recipient", value = "[ADDRESS]" },
                { name = "Quantity", value = "100" }
                }
            })"""
            -- Final Token Example for your reference:
               NOTE: When implementing a token it is important to remember that all Tags on a message MUST be "string"s. Using thetostring function you can convert simple types to strings.

            """\lua\
            if not balances then
              balances = { [ao.id] = 100000000000000 }
            end

            if name ~= "Fun Coin" then
              name = "Fun Coin"
            end

            if ticker ~= "Fun" then
              ticker = "fun"
            end

            if denomination ~= 6 then
              denomination = 6
            end

            -- handlers that handler incoming msg
            handlers.add(
              "transfer",
              handlers.utils.hasMatchingTag("Action", "Transfer"),
              function (msg)
                assert(type(msg.Tags.Recipient) == 'string', 'Recipient is required!')
                assert(type(msg.Tags.Quantity) == 'string', 'Quantity is required!')

                if not balances[msg.From] then
                  balances[msg.From] = 0
                end

                if not balances[msg.Tags.Recipient] then
                  balances[msg.Tags.Recipient] = 0
                end

                local qty = tonumber(msg.Tags.Quantity)
                assert(type(qty) == 'number', 'qty must be number')
                -- handlers.utils.reply("Transfering qty")(msg)
                if balances[msg.From] >= qty then
                  balances[msg.From] = balances[msg.From] - qty
                  balances[msg.Tags.Recipient] = balances[msg.Tags.Recipient] + qty
                  ao.send({
                    Target = msg.From,
                    Tags = {
                      Action = "Debit-Notice",
                      Quantity = tostring(qty)
                    }
                  })
                  ao.send({
                  Target = msg.Tags.Recipient,
                  Tags = {
                    Action = "Credit-Notice",
                    Quantity = tostring(qty)
                  }})
                  -- if msg.Tags.Cast and msg.Tags.Cast == "true" then
                  --   return
                  -- end

                end
              end
            )

            handlers.add(
              "balance",
              handlers.utils.hasMatchingTag("Action", "Balance"),
              function (msg)
                assert(type(msg.Tags.Target) == "string", "Target Tag is required!")
                local bal = "0"
                if balances[msg.Tags.Target] then
                  bal = tostring(balances[msg.Tags.Target])
                end
                ao.send({Target = msg.From, Tags = {
                  Target = msg.From,
                  Balance = bal,
                  Ticker = ticker or ""
                }})
              end
            )

            local json = require("json")

            handlers.add(
              "balances",
              handlers.utils.hasMatchingTag("Action", "Balances"),
              function (msg)
                ao.send({
                  Target = msg.From,
                  Data = json.encode(balances)
                })
              end

            )

            handlers.add(
              "info",
              handlers.utils.hasMatchingTag("Action", "Info"),
              function (msg)
                ao.send({Target = msg.From, Tags = {
                  Name = name,
                  Ticker = ticker,
                  Denomination = tostring(denomination)
                }})
              end
            )"""
    `,
  `       
    lua
    { Action = "Balance" }
    if you want to match on every message with the Quantity being a Number

    lua
    { Quantity = "%d+" }
    Resolvers
    Resolvers are tables in which each key is a pattern matching table and the value is a function that is executed based on the matching key. This allows developers to create case like statements in the resolver property.

    lua
    Handlers.add("foobarbaz",
    { Action = "Update" }, {
    [{ Status = "foo" }] = function (msg) print("foo") end,
    [{ Status = "bar" }] = function (msg) print("bar") end,
    [{ Status = "baz" }] = function (msg) print("baz") end
    })
    Module Structure
    Handlers._version: String representing the version of the Handlers library.
    Handlers.list: Table storing the list of registered handlers.
    Handler method common function signature
    Parameter	Type	Description
    name	string	The identifier of the handler item in the handlers list.
    pattern	Table or Function	This parameter can take a table that specifies a pattern that the message MUST match, for example { Action = "Balance", Recipient = "_" } this table describes a message that has a Tag called action and it equals the string "Balance", and the message MUST have a Recipient Tag with a value. If you are unable to add a pattern via a table, you can also use the function which receives the message DataItem as its argument and you can return a true, false or "continue" result. The true result tells the Handlers evaluation pipeline to invoke this handler and exit out of the pipeline. The false result tells the Handlers evaluation pipeline to skip this handler and try to find a pattern matched by the next Handler item in the pipeline. Finally, the "continue" informs the Handlers evaluation to invoke this handler and continue evaluating.
    handler	Table (Resolver) or Function	This parameter can take a table that acts as a conditional that invokes a function based on a pattern matched key. or a Function that takes the message DataItem as an argument and performs some business logic.
    maxRuns (optional)	number	As of 0.0.5, each handler function takes an optional function to define the amount of times the handler should match before it is removed. The default is infinity.
    Functions
    Handlers.add(name, pattern, handler)
    adds a new handler or updates an existing handler by name

    Handlers.append(name, pattern, handle)
    Appends a new handler to the end of the handlers list.

    Handlers.once(name, pattern, handler)
    Only runs once when the pattern is matched.

    Handlers.prepend(name, pattern, handle)
    Prepends a new handler to the beginning of the handlers list.

    Handlers.before(handleName)
    Returns an object that allows adding a new handler before a specified handler.

    Handlers.after(handleName)
    Returns an object that allows adding a new handler after a specified handler.

    Handlers.remove(name)
    Removes a handler from the handlers list by name.

    Examples
    Using pattern Table
    lua
    Handlers.add("ping",
    { Action = "ping" },
    function (msg)
        print('ping')
        msg.reply({Data = "pong" })
    end
    )
    Using resolvers
    lua
    Handlers.add(
    "foobarbaz",
    { Action = "Speak" }, {
    [{Status = "foo"}] = function (msg) print("foo") end,
    [{Status = "bar"}] = function (msg) print("bar") end,
    [{Status = "baz"}] = function (msg) print("baz") end
    })
    Using functions
    lua
    Handlers.add("example",
    function (msg)
        return msg.Action == "Speak"
    end,
    function (msg)
        print(msg.Status)
    end
    )
    Notes
    Handlers are executed in the order they appear in handlers.list.
    The pattern function should return false to skip the handler, true to break after the handler is executed, or "continue" to execute handler and continue with the next handler.
    Handlers.utils
    The Handlers.utils module provides two functions that are common matching patterns and one function that is a common handle function.

    hasMatchingData(data)
    hasMatchingTag(name, value)
    reply(txt)
    Handlers.utils.hasMatchingData(data : string)
    This helper returns a function that requires a message argument, so you can drop this into the pattern argument of any handler. The function compares the data on the incoming message with the string provided as an argument.

    lua
    Handlers.add("ping",
        Handlers.utils.hasMatchingData("ping"),
        ...
    )
    If a message comes into the process with data set to ping, this handler will match on it and invoke the handle function.

    Handlers.hasMatchingTag(name : string, value : string)
    This helper returns a function that requires a message argument, so you can drop this into any pattern argument on the Handlers module. The function compares the Tag Name and Value, if they are equal then it invokes the handle function.

    lua
    Handlers.add("ping",
        Handlers.utils.hasMatchingData("ping"),
        ...
    )
    Handlers.reply(text : string)
    This helper is a simple handle function, it basically places the text value in to the Data property of the outbound message.

    lua
    Handlers.add("ping",
        Handlers.utils.hasMatchingData("ping"),
        Handlers.utils.reply("pong"))`
  ,
  `         
      """
      Installing ao connect
      Prerequisites
      In order to install ao connect into your app you must have NodeJS/NPM 18 or higher.

      Installing
      npm
      sh
      npm install --save @permaweb/aoconnect
      yarn
      sh
      yarn add @permaweb/aoconnect -D

      This module can now be used from NodeJS as well as a browser, it can be included as shown below.

      ESM (Node & Browser) aka type: module
      js
      import {
        result,
        results,
        message,
        spawn,
        monitor,
        unmonitor,
        dryrun,
      } from "@permaweb/aoconnect";
      CJS (Node) type: commonjs
      js
      const {
        result,
        results,
        message,
        spawn,
        monitor,
        unmonitor,
        dryrun,
      } = require("@permaweb/aoconnect");
      """

      """
      Importing without a call to connect
      js
      // Here aoconnect will implicitly use the default nodes/units
      import {
        result,
        results,
        message,
        spawn,
        monitor,
        unmonitor,
        dryrun,
      } from "@permaweb/aoconnect";
      """
      """
      Sending a Message to a Process
      A deep dive into the concept of Messages can be found in the ao Messages concept. This guide focuses on using ao connect to send a message to a process.

      Sending a message is the central way in which your app can interact with ao. A message is input to a process. There are 5 parts of a message that you can specify which are "target", "data", "tags", "anchor", and finally the messages "signature".

      Refer to your process module's source code or documentation to see how the message is used in its computation. The ao connect library will translate the parameters you pass it in the code below, construct a message, and send it.

      🎓 To Learn more about Wallets visit the Permaweb Cookbook

      Sending a Message in NodeJS
      Need a test wallet, use npx -y @permaweb/wallet > /path/to/wallet.json to create a wallet keyfile.

      js
      import { readFileSync } from "node:fs";

      import { message, createDataItemSigner } from "@permaweb/aoconnect";

      const wallet = JSON.parse(
        readFileSync("/path/to/arweave/wallet.json").toString(),
      );

      // The only 2 mandatory parameters here are process and signer
      await message({
        /*
          The arweave TXID of the process, this will become the "target".
          This is the process the message is ultimately sent to.
        */
        process: "process-id",
        // Tags that the process will use as input.
        tags: [
          { name: "Your-Tag-Name-Here", value: "your-tag-value" },
          { name: "Another-Tag", value: "another-value" },
        ],
        // A signer function used to build the message "signature"
        signer: createDataItemSigner(wallet),
        /*
          The "data" portion of the message
          If not specified a random string will be generated
        */
        data: "any data",
      })
        .then(console.log)
        .catch(console.error);
      Sending a Message in a browser
      New to building permaweb apps check out the Permaweb Cookbook

      js
      import { message, createDataItemSigner } from "@permaweb/aoconnect";

      // The only 2 mandatory parameters here are process and signer
      await message({
        /*
          The arweave TXID of the process, this will become the "target".
          This is the process the message is ultimately sent to.
        */
        process: "process-id",
        // Tags that the process will use as input.
        tags: [
          { name: "Your-Tag-Name-Here", value: "your-tag-value" },
          { name: "Another-Tag", value: "another-value" },
        ],
        // A signer function used to build the message "signature"
        signer: createDataItemSigner(globalThis.arweaveWallet),
        /*
          The "data" portion of the message.
          If not specified a random string will be generated
        */
        data: "any data",
      })
        .then(console.log)
        .catch(console.error);
      """
      """
      Reading results from an ao Process
      In ao, messages produce results which are made available by Compute Units (CU's). Results are JSON objects consisting of the following fields: messages, spawns, output and error.

      Results are what the ao system uses to send messages and spawns that are generated by processes. A process can send a message just like you can as a developer, by returning messages and spawns in a result.

      You may want to access a result to display the output generated by your message. Or you may want to see what messages etc., were generated. You do not need to take the messages and spawns from a result and send them yourself. They are automatically handled by Messenger Units (MU's). A call to results can also provide you paginated list of multiple results.

      Fetching a single result
      
      """
      """
    
     
      """
      """
      Calling DryRun
      DryRun is the process of sending a message object to a specific process and getting the Result object back, but the memory is not saved, it is perfect to create a read message to return the current value of memory. For example, a balance of a token, or a result of a transfer, etc. You can use DryRun to obtain an output without sending an actual message.
      js
      import { createDataItemSigner, dryrun } from "@permaweb/aoconnect";
      const result = await dryrun({
        process: 'PROCESSID',
        data: '',
        tags: [{name: 'Action', value: 'Balance'},
        anchor: '1234',
        ...rest are optional (Id, Owner, etc)
      });
      console.log(result.Messages[0]);
      """
      """
  
      """
      """
      `
  , `
      Arweave Wallet Kit
      React Hooks and Components for better interaction with Arweave wallets. Modular, can support any Arweave-based wallet.

      //install
      npm i arweave-wallet-kit

      import {ArweaveWalletKit} from 'arweave-wallet-kit'
      const App = () => {
        return (
          <ArweaveWalletKit> //ArweaveWalletKitProvider
            <YourApp />
          </ArweaveWalletKit>
        );
      };
      Config
      The Arweave Wallet Kit can be configured with information about your application and with a custom theme.
      ...
        <ArweaveWalletKit
          config={{
            permissions: ["ACCESS_ADDRESS"],
            ensurePermissions: true,
            ...
          }}
          theme={{
            accent: { r: 255, g: 0, b: 0 },
            ...
          }}
        >
          <YourApp />
        </ArweaveWalletKit>
      ...
      App config
      Using the config field of the <ArweaveWalletKit> provider component, you can define a name, a logo or the required permissions for your app.

      Available options
      Prop	Type	Default	
      permissions	PermissionType[]	[]	Permissions to connect with.
      ensurePermissions	boolean	 false	Ensure that all required permissions are present. If false, it only checks if the app has any permissions.
      appInfo	AppInfo	{}	Information about your app (name/logo).
      gatewayConfig	GatewayConfig	arweave.net gateway	Configuration for the Arweave gateway to use.
      Custom theme
      With the theme field, you can define a custom theme configuration for the Arweave Wallet Kit modals and buttons.

      Available options
      Prop	Type	
      displayTheme	"dark", "light"	UI display theme to use
      accent	RGBObject	RGB accent color for the UI
      titleHighlight	RGBObject	RGB accent color for the subscreen titles (like the connection screen)
      radius	"default", "minimal", "none"	Border radius level used throughout the Kit UI
      font	Font	Including font family used throughout the Kit UI
      Font
      The font field in the theme configuration allows you to specify the font family to be used throughout the Kit UI. It should be an object with a fontFamily property, which is a string representing the font family. If nothing is specified, the default font family is Manrope with a fallback to the next available sans-serif font in the system.

      Here's an example of how to use it:

      ...
      <ArweaveWalletKit
        theme={{
          font: {
            fontFamily: "Arial"
          },
          // other theme properties...
        }}
      />
      ...
      Terminology of Arweave Wallet Kit
      Arweave Wallet Kit supports several strategies. The word strategy means an implementation of an Arweave Wallet in the Kit. These strategies allow the user to communicate with all wallets the same way and with the same API.

      Connect Button
      To quickly integrate the Arweave Wallet Kit, you can use the <ConnectButton> component. It is a highly customizable button that supports the ANS protocol to display information about the connected wallet.

      Usage
      <ConnectButton
        accent="rgb(255, 0, 0)"
        profileModal={false}
        showBalance={true}
        ...
      />
      Config
      You can configure the Connect Button through it's props.

      Props	Type	
      accent	string	 A theme color for the button
      showBalance	boolean	Show user balance when connected
      showProfilePicture	boolean	Show user profile picture when connected
      useAns	boolean	Use ANS to grab profile information
      profileModal	boolean	Show profile modal on click (if disabled, clicking the button will disconnect the user)
      Hooks
      Inside the <ArweaveWalletKit>, you can use all kinds of hooks that are reactive to the different strategies. Some of the hooks / api functions might not be supported by all wallets.

      useConnection: The core hook for connecting / disconnecting a strategy.

      Usage
      const { connected, connect, disconnect } = useConnection();
      // initiate connection
      await connect();
      // disconnect the connected strategy
      await disconnect();
      // is there a strategy connected?
      connected ? "wallet connected" : "no connected wallet";
      useApi
      API hook. Returns the active strategy's API as an interactable object. Can be used to sign/encrypt, etc.
      Some API functions might not be supported depending on the strategy the user chose. For example, Othent does not support the signature() function. Make sure to verify beforehand.

      Usage
      const api = useApi();

      // sign
      await api.sign(transaction);

      const profileModal = useProfileModal();

      profileModal.setOpen(true);
      useActiveAddress
      Active address hook. Requires the ACCESS_ADDRESS and the ACCESS_ALL_ADDRESSES permission.

      Usage
      const address = useActiveAddress();
      usePublicKey
      Active address hook. Requires the ACCESS_PUBLIC_KEY permission.

      Usage
      const publicKey = usePublicKey();
      usePermissions
      Permissions hook. Returns the permissions given to the app, known by Arweave Wallet Kit.

      Usage
      const permissions = usePermissions();
      useAddresses
      All addresses hook. Returns the addresses in the connected wallet, known by Arweave Wallet Kit. Requires the ACCESS_ALL_ADDRESSES permission.

      Usage
      const addresses = useAddresses();
      useWalletNames
      All addresses hook. Returns the addresses in the connected wallet, known by Arweave Wallet Kit. Requires the ACCESS_ALL_ADDRESSES permission.

      Usage
      const walletNames = useWalletNames();
      useStrategy
      Active strategy hook. Returns the currently used strategy's ID.

      Usage
      const strategy = useStrategy();

      Wallet Kit
      React Hooks and Components for better interaction with Arweave wallets

      Terminology
      The Arweave Wallet Kit supports several strategies. The word strategy means an implementation of an Arweave Wallet in the Kit. These strategies allow the user to communicate with all wallets the same way and with the same API.
      """
      Setup
        Setup the Arweave Wallet Kit component library

        Installation
        The Wallet Kit is available on npm.

        Copy
        yarn add arweave-wallet-kit
        or

        Copy
        npm i arweave-wallet-kit
        Setup provider
        To use the library, you'll need to wrap your application with the Kit Provider.

        Copy
        import { ArweaveWalletKit } from "arweave-wallet-kit";

        const App = () => {
          return (
            <ArweaveWalletKit>
              <YourApp />
            </ArweaveWalletKit>
          );
        };
      """
      """
      Customization
        Apply various customizations to the Wallet Kit UI

        Manage customizations
        Custom configuration can be applied using the Wallet Kit Provider:

        Copy
        ...
          <ArweaveWalletKit
            config={{
              permissions: ["ACCESS_ADDRESS"],
              ensurePermissions: true,
              ...
            }}
            theme={{
              accent: { r: 255, g: 0, b: 0 },
              ...
            }}
          >
            <YourApp />
          </ArweaveWalletKit>
        ...
        Application info
        Using the config field of the <ArweaveWalletKit> provider component, you can define a name, a logo or the required permissions for your app. The following options are available:

        Prop	Type	Default	Description
        permissions

        PermissionType[]

        []

        Permissions to connect with.

        ensurePermissions

        boolean

        false

        Ensure that all required permissions are present. If false, it only checks if the app has any permissions.

        appInfo

        AppInfo

        {}

        Information about your app (name/logo).

        gatewayConfig

        GatewayConfig

        arweave.net gateway

        Configuration for the Arweave gateway to use.

        Theming
        With the theme field, you can define a custom theme configuration for the Arweave Wallet Kit modals and buttons. The following options are available:

        Prop	Type	Description
        displayTheme

        "dark", "light"

        UI display theme to use

        accent

        RGBObject

        RGB accent color for the UI

        titleHighlight

        RGBObject

        RGB accent color for the subscreen titles (like the connection screen)

        radius

        "default", "minimal", "none"

        Border radius level used throughout the Kit UI
      """
      """
      Hooks
        React hooks that provide deeper access into the wallet APIs

        Inside the <ArweaveWalletKit>, you can use all kinds of hooks that are reactive to the different strategies. Some of the hooks and/or api functions might not be supported by all wallets.

        useConnection
        The core hook for connecting / disconnecting a strategy.

        Usage

        Copy
        const { connected, connect, disconnect } = useConnection();

        // initiate connection
        await connect();

        // disconnect the connected strategy
        await disconnect();

        // is there a strategy connected?
        connected ? "wallet connected" : "no connected wallet";
        useApi
        API hook. Returns the active strategy's API as an intractable object. Can be used to sign/encrypt, etc.

        Usage

        Copy
        const api = useApi();

        // sign
        await api.sign(transaction);

        // encrypt
        await api.encrypt(...)
        Some API functions might not be supported depending on the strategy the user chose. (e.g.: Othent does not support the signature() function.

        useProfileModal
        Toggle / display a modal with profile information and a disconnect button.

        Copy
        const profileModal = useProfileModal();

        profileModal.setOpen(true);
        useActiveAddress
        Active address hook. Requires the ACCESS_ADDRESS and the ACCESS_ALL_ADDRESSES permission.

        Usage

        Copy
        const address = useActiveAddress();
        usePublicKey
        Active address hook. Requires the ACCESS_PUBLIC_KEY permission.

        Usage

        Copy
        const publicKey = usePublicKey();
        usePermissions
        Permissions hook. Returns the permissions given to the app, known by Arweave Wallet Kit.

        Usage

        Copy
        const permissions = usePermissions();
        useAddresses
        All addresses hook. Returns the addresses in the connected wallet, known by Arweave Wallet Kit. Requires the ACCESS_ALL_ADDRESSES permission.

        Usage

        Copy
        const addresses = useAddresses();
        useWalletNames
        All addresses hook. Returns the addresses in the connected wallet, known by Arweave Wallet Kit. Requires the ACCESS_ALL_ADDRESSES permission.

        Usage

        Copy
        const walletNames = useWalletNames();
        useStrategy
        Active strategy hook. Returns the currently used strategy's ID ("arconnect", "webwallet", etc.)

        Usage

        Copy
        const strategy = useStrategy();
      """
      """
      Connect Button
        The Connect Button provides an option to easily integrate the Wallet Kit

        The <ConnectButton> component is a highly customizable button that supports the ANS protocol to display information about the connected wallet.

        Usage
        After importing the component, you can use it anywhere in your React application:

        Copy
        <ConnectButton
          accent="rgb(255, 0, 0)"
          profileModal={false}
          showBalance={true}
          ...
        />
        Configuration
        You can configure the Connect Button through its props:

        Props	Type	Description
        accent

        string

        A theme color for the button

        showBalance

        boolean

        Show user balance when connected

        showProfilePicture

        boolean

        Show user profile picture when connected

        useAns

        boolean

        Use ANS to grab profile information

        profileModal

        boolean

        Show profile modal on click (if disabled, clicking the button will disconnect the user)
      """
      """
      Wallet Plugins
        Plug in a external package to arweavekit/wallet

        The use function exposed via the ArweaveKit object from arweavekit/wallet package allows you to plugin external packages into arweave kit package.

        Basic Syntax
        The function is called as follows:

        usage.js
        Copy
        import * as externalPackage from 'externalPackage';
        import { ArweaveKit } from 'arweavekit/wallet';

        const arweaveKit = ArweaveKit.use({ name: 'MyPlugIn', plugin: externalPackage });

        console.log(arweavekit.functionFromExternalPackage())
        The ArweaveKit object imported also contains all functions from the ArweaveKit package for ease of use.

        Create a Plugin
        Most existing packages in Arweave will already be supported without any additional work, the functions just need to be defined and exported in the external package:

        externalPackage.js
        Copy
        import * as ExternalPackage from 'package'
        export function PackagePlugIn() {
            return ExternalPackage
        }
      """
      """
      Introduction to Transactions
        Introduction to transactions on Arweave

        Transactions on Arweave
        Any change to the state of the blockchain (information stored on chain) is considered a transaction.

        The two common types of transactions on Arweave are uploading data on chain and transfer of assets between wallets.

        The transaction process on Arweave is split into 3 steps for convenience,  customisation and reduction in compute time. Namely, creating the transaction, signing it and then posting it on Arweave. The next pages look at these in depth.

        Transactions from a development perspective
        Developers need to create user friendly tools, applications and interfaces that let users perform transactions like uploading data on chain or sending tokens without the need for writing code for it.

        Libraries used
        The functions associated with transactions leverage the following libraries:

        Arweave JS

        Bundlr Network SDK

        Othent

        Transaction based functions
        In this section, we will look at the following features:

        creating a transaction

        signing a transaction

        posting the transaction on chain

        getting the status of a transaction

        getting an existing transaction from the network

        creating and posting a transaction to the network with Othent
      """
      """
      Create Transaction
        Create a transaction on Arweave

        The createTransaction function creates a transaction based on the input parameters. The transaction can either be a data upload transaction or a wallet to wallet (token transfer) transaction.

        Basic Syntax
        The function is called as follows:

        Copy
        import { createTransaction } from 'arweavekit/transaction'

        const transaction = await createTransaction({params});
        Input Parameters
        The following params are available for this function and they must be passed in as an object:

        type: 'data' | 'wallet' : The type of transaction to be created. A data type transaction uploads data on Arweave whereas a wallet type transaction transfers tokens from one wallet to another.

        key: JWKInterface (optional) : The private key for the wallet address to be fetched. The wallet key is optional for default transaction creation as no key is needed until signing a transaction, however, it must be passed in if the useBundlr or signAndPost option is set to true. The wallet key file can be loaded as follows:

        Copy
        import { readFileSync } from 'fs';

        const key = JSON.parse(readFileSync('wallet.json').toString());
        Private keys must be kept secure at all times. Please ensure that the wallet.json file is not pushed to a version control (eg. GitHub).

        It is important to JSON.parse the read file as this returns the key in the correct format (object) for further use.

        environment: 'local' | 'mainnet' : The environment for creating transactions. As this is only one part of the three step process of uploading transactions to Arweave, it is important that the transaction is signed and posted in the same environment it is created on.

        An arlocal instance must be running on port 
        1984
        for the function to work with the local environment. To create one, simply run npx arlocal in the command line. Learn more about arlocal here.

        Currently, the Bundlr SDK only supports the mainnet environment.

        target: string (optional) : The wallet address to which the wallet to wallet transaction must be sent.

        The target must be accompanied with a quantity , else it sends a transaction with 0 tokens by default.

        quantity: string (optional) : The quantity specifies the units of Winston to be sent in a wallet to wallet transaction.

        The quantity must be accompanied with a target wallet address.

        Winston is the smallest possible unit of AR, similar to a satoshi in Bitcoin, or wei in Ethereum.

        1 AR = 1000000000000 Winston (12 zeros) and 1 Winston = 0.000000000001 AR.

        data: string | Uint8Array | ArrayBuffer (optional) : To create a data type transaction, this optional parameter can be passed in. The data can be passed as a string, Uint8Array or an ArrayBuffer (as preferred by the network).

        options : Additional options can be passed in as a JSON object. 

        tags: array (optional) : Tags can be added to any transaction for ease of indexing and querying. The syntax for adding tags is as follows:

        Copy
        tags: [{ 'name': key_name, 'value': some_value},
                { 'name': key_name2, 'value': some_value2}]
        The name is the key for a given value that can be used for querying the   transaction in the future. By default the library adds the 'ArweaveKit' : '1.5.1' tag on the backend to help identify the library and version used to deploy the function.

        signAndPost: boolean (optional) : By default, the transaction process on Arweave has three steps to reduce the computation time, and provide convenience and customisation. However, by setting this option to true, the function signs and posts the transaction on chain in the same function call.

        useBundlr: boolean (optional) : Creates the transaction using bundlr network. Only data type transactions can use this option. If the data size is under 100kB the transaction does not require any fees for processing through Bundlr.

        Currently, the Bundlr SDK only supports data based transactions and only on the mainnet.

        The option to signAndPost must be set to true for using Bundlr. Transactions using Bundlr will be signed and posted to the network by default as there is no support for signing and uploading Bundlr transactions in separate steps.

        Web Transactions using Bundlr will fallback on Arweave in case of failure.

        Returned Data
        The function call returns the following data depending on input parameters:

        Default transaction (when useBundlr is false):

        An object of type Transaction is returned by Arweave.

        The data related key value pairs hold information when data prop is passed in.

        The target and quantity fields have in formation for wallet-to-wallet transactions.

        The signature key has no information until the transaction is signed.

        The id of a transaction is only received after calling the postTransaction function (basically, when the transaction is posted on Arweave).

        On selecting the signAndPost option the function returns a status object along with the transaction object. status: 200 and statusText: 'OK' indicates a successful post request on Arweave.

        The transaction is created on the selected environment (local or mainnet).

        When the useBundlr option is set to true:

        An object of type Bundlr Transaction and an object containing the id of the posted transaction and the timestamp are returned.

        The Bundlr Transaction object consists information regarding the network, currency, data to be posted, tags, etc.

        The environment is always mainnet.

        A few errors help identify the correct parameters in case any might be missing or not as expected. 
      """
      """
      
      """
    `,
  `
    While final giving me the code, you hace to export the components into a single index.ts file, so create a index.ts file and export all the components from there, also you have to provide the code only, no text, Also stick to the specified docs, like if user asked for handler then you have to use handler syntax. 
    `,
  "After getting reponse based on user response, you just have to provide code only, no text, Also stick to the specified docs, like if user asked for handler then you have to use handler syntax. Also provide the lua code by understanding what can be done in arweave handlers based on the given prompt as well.",
  `Here is an artifact that contains all files of the project visible to you.\nConsider the contents of ALL files in the project.\n\n${reactBasePrompt}\n\nHere is a list of files that exist on the file system but are not being shown to you:\n\n  - .gitignore\n  - package-lock.json\n`
];