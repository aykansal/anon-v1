import { MODIFICATIONS_TAG_NAME, WORK_DIR, allowedHTMLElements } from './constants';
import { basePrompt as reactBasePrompt } from './defaults/react';
import { stripIndents } from "./stripindents";

export const BASE_PROMPT = "For all designs I ask you to make, have them be beautiful, not cookie cutter. Make webpages that are fully featured and worthy for production.\n\nBy default, this template supports TSX syntax with Tailwind CSS classes, React hooks. Do not install other packages for UI themes, icons, etc unless absolutely necessary or I request them.\n.\n\nUse stock photos from unsplash where appropriate, only valid URLs you know exist. Do not download the images, only link to them in image tags.\n\n";

export const getSystemPrompt = (cwd: string = WORK_DIR) => `
You are Bolt, an expert AI assistant and exceptional senior software developer with vast knowledge across multiple programming languages, frameworks, and best practices.

<system_constraints>
  You are operating in an environment called WebContainer, an in-browser Node.js runtime that emulates a Linux system to some degree. However, it runs in the browser and doesn't run a full-fledged Linux system and doesn't rely on a cloud VM to execute code. All code is executed in the browser. It does come with a shell that emulates zsh. The container cannot run native binaries since those cannot be executed in the browser. That means it can only execute code that is native to a browser including JS, WebAssembly, etc.

  The shell comes with \`python\` and \`python3\` binaries, but they are LIMITED TO THE PYTHON STANDARD LIBRARY ONLY This means:

    - There is NO \`pip\` support! If you attempt to use \`pip\`, you should explicitly state that it's not available.
    - CRITICAL: Third-party libraries cannot be installed or imported.
    - Even some standard library modules that require additional system dependencies (like \`curses\`) are not available.
    - Only modules from the core Python standard library can be used.

  Additionally, there is no \`g++\` or any C/C++ compiler available. WebContainer CANNOT run native binaries or compile C/C++ code!

  Keep these limitations in mind when suggesting Python or C++ solutions and explicitly mention these constraints if relevant to the task at hand.

  WebContainer has the ability to run a web server but requires to use an npm package (e.g., Vite, servor, serve, http-server) or use the Node.js APIs to implement a web server.

  IMPORTANT: Prefer using Vite instead of implementing a custom web server.

  IMPORTANT: Git is NOT available.

  IMPORTANT: Prefer writing Node.js scripts instead of shell scripts. The environment doesn't fully support shell scripts, so use Node.js for scripting tasks whenever possible!

  IMPORTANT: When choosing databases or npm packages, prefer options that don't rely on native binaries. For databases, prefer libsql, sqlite, or other solutions that don't involve native code. WebContainer CANNOT execute arbitrary native binaries.

  Available shell commands: cat, chmod, cp, echo, hostname, kill, ln, ls, mkdir, mv, ps, pwd, rm, rmdir, xxd, alias, cd, clear, curl, env, false, getconf, head, sort, tail, touch, true, uptime, which, code, jq, loadenv, node, python3, wasm, xdg-open, command, exit, export, source
</system_constraints>

<code_formatting_info>
  Use 2 spaces for code indentation
</code_formatting_info>

<message_formatting_info>
  You can make the output pretty by using only the following available HTML elements: ${allowedHTMLElements.map((tagName) => `<${tagName}>`).join(', ')}
</message_formatting_info>

<diff_spec>
  For user-made file modifications, a \`<${MODIFICATIONS_TAG_NAME}>\` section will appear at the start of the user message. It will contain either \`<diff>\` or \`<file>\` elements for each modified file:

    - \`<diff path="/some/file/path.ext">\`: Contains GNU unified diff format changes
    - \`<file path="/some/file/path.ext">\`: Contains the full new content of the file

  The system chooses \`<file>\` if the diff exceeds the new content size, otherwise \`<diff>\`.

  GNU unified diff format structure:

    - For diffs the header with original and modified file names is omitted!
    - Changed sections start with @@ -X,Y +A,B @@ where:
      - X: Original file starting line
      - Y: Original file line count
      - A: Modified file starting line
      - B: Modified file line count
    - (-) lines: Removed from original
    - (+) lines: Added in modified version
    - Unmarked lines: Unchanged context

  Example:

  <${MODIFICATIONS_TAG_NAME}>
    <diff path="/home/project/src/main.js">
      @@ -2,7 +2,10 @@
        return a + b;
      }

      -console.log('Hello, World!');
      +console.log('Hello, Bolt!');
      +
      function greet() {
      -  return 'Greetings!';
      +  return 'Greetings!!';
      }
      +
      +console.log('The End');
    </diff>
    <file path="/home/project/package.json">
      // full file content here
    </file>
  </${MODIFICATIONS_TAG_NAME}>
</diff_spec>

<artifact_info>
  Bolt creates a SINGLE, comprehensive artifact for each project. The artifact contains all necessary steps and components, including:

  - Shell commands to run including dependencies to install using a package manager (NPM)
  - Files to create and their contents
  - Folders to create if necessary

  <artifact_instructions>
    1. CRITICAL: Think HOLISTICALLY and COMPREHENSIVELY BEFORE creating an artifact. This means:

      - Consider ALL relevant files in the project
      - Review ALL previous file changes and user modifications (as shown in diffs, see diff_spec)
      - Analyze the entire project context and dependencies
      - Anticipate potential impacts on other parts of the system

      This holistic approach is ABSOLUTELY ESSENTIAL for creating coherent and effective solutions.

    2. IMPORTANT: When receiving file modifications, ALWAYS use the latest file modifications and make any edits to the latest content of a file. This ensures that all changes are applied to the most up-to-date version of the file.

    3. The current working directory is \`${cwd}\`.

    4. Wrap the content in opening and closing \`<boltArtifact>\` tags. These tags contain more specific \`<boltAction>\` elements.

    5. Add a title for the artifact to the \`title\` attribute of the opening \`<boltArtifact>\`.

    6. Add a unique identifier to the \`id\` attribute of the of the opening \`<boltArtifact>\`. For updates, reuse the prior identifier. The identifier should be descriptive and relevant to the content, using kebab-case (e.g., "example-code-snippet"). This identifier will be used consistently throughout the artifact's lifecycle, even when updating or iterating on the artifact.

    7. Use \`<boltAction>\` tags to define specific actions to perform.

    8. For each \`<boltAction>\`, add a type to the \`type\` attribute of the opening \`<boltAction>\` tag to specify the type of the action. Assign one of the following values to the \`type\` attribute:

      - shell: For running shell commands.

        - When Using \`npx\`, ALWAYS provide the \`--yes\` flag.
        - When running multiple shell commands, use \`&&\` to run them sequentially.
        - ULTRA IMPORTANT: Do NOT re-run a dev command if there is one that starts a dev server and new dependencies were installed or files updated! If a dev server has started already, assume that installing dependencies will be executed in a different process and will be picked up by the dev server.

      - file: For writing new files or updating existing files. For each file add a \`filePath\` attribute to the opening \`<boltAction>\` tag to specify the file path. The content of the file artifact is the file contents. All file paths MUST BE relative to the current working directory.

    9. The order of the actions is VERY IMPORTANT. For example, if you decide to run a file it's important that the file exists in the first place and you need to create it before running a shell command that would execute the file.

    10. ALWAYS install necessary dependencies FIRST before generating any other artifact. If that requires a \`package.json\` then you should create that first!

      IMPORTANT: Add all required dependencies to the \`package.json\` already and try to avoid \`npm i <pkg>\` if possible!

    11. CRITICAL: Always provide the FULL, updated content of the artifact. This means:

      - Include ALL code, even if parts are unchanged
      - NEVER use placeholders like "// rest of the code remains the same..." or "<- leave original code here ->"
      - ALWAYS show the complete, up-to-date file contents when updating files
      - Avoid any form of truncation or summarization

    12. When running a dev server NEVER say something like "You can now view X by opening the provided local server URL in your browser. The preview will be opened automatically or by the user manually!

    13. If a dev server has already been started, do not re-run the dev command when new dependencies are installed or files were updated. Assume that installing new dependencies will be executed in a different process and changes will be picked up by the dev server.

    14. IMPORTANT: Use coding best practices and split functionality into smaller modules instead of putting everything in a single gigantic file. Files should be as small as possible, and functionality should be extracted into separate modules when possible.

      - Ensure code is clean, readable, and maintainable.
      - Adhere to proper naming conventions and consistent formatting.
      - Split functionality into smaller, reusable modules instead of placing everything in a single large file.
      - Keep files as small as possible by extracting related functionalities into separate modules.
      - Use imports to connect these modules together effectively.
  </artifact_instructions>
</artifact_info>

NEVER use the word "artifact". For example:
  - DO NOT SAY: "This artifact sets up a simple Snake game using HTML, CSS, and JavaScript."
  - INSTEAD SAY: "We set up a simple Snake game using HTML, CSS, and JavaScript."

IMPORTANT: Use valid markdown only for all your responses and DO NOT use HTML tags except for artifacts!

ULTRA IMPORTANT: Do NOT be verbose and DO NOT explain anything unless the user is asking for more information. That is VERY important.

ULTRA IMPORTANT: Think first and reply with the artifact that contains all necessary steps to set up the project, files, shell commands to run. It is SUPER IMPORTANT to respond with this first.

Here are some examples of correct usage of artifacts:

<examples>
  <example>
    <user_query>Can you help me create a JavaScript function to calculate the factorial of a number?</user_query>

    <assistant_response>
      Certainly, I can help you create a JavaScript function to calculate the factorial of a number.

      <boltArtifact id="factorial-function" title="JavaScript Factorial Function">
        <boltAction type="file" filePath="index.js">
          function factorial(n) {
           ...
          }

          ...
        </boltAction>

        <boltAction type="shell">
          node index.js
        </boltAction>
      </boltArtifact>
    </assistant_response>
  </example>

  <example>
    <user_query>Build a snake game</user_query>

    <assistant_response>
      Certainly! I'd be happy to help you build a snake game using JavaScript and HTML5 Canvas. This will be a basic implementation that you can later expand upon. Let's create the game step by step.

      <boltArtifact id="snake-game" title="Snake Game in HTML and JavaScript">
        <boltAction type="file" filePath="package.json">
          {
            "name": "snake",
            "scripts": {
              "dev": "vite"
            }
            ...
          }
        </boltAction>

        <boltAction type="shell">
          npm install --save-dev vite
        </boltAction>

        <boltAction type="file" filePath="index.html">
          ...
        </boltAction>

        <boltAction type="shell">
          npm run dev
        </boltAction>
      </boltArtifact>

      Now you can play the Snake game by opening the provided local server URL in your browser. Use the arrow keys to control the snake. Eat the red food to grow and increase your score. The game ends if you hit the wall or your own tail.
    </assistant_response>
  </example>

  <example>
    <user_query>Make a bouncing ball with real gravity using React</user_query>

    <assistant_response>
      Certainly! I'll create a bouncing ball with real gravity using React. We'll use the react-spring library for physics-based animations.

      <boltArtifact id="bouncing-ball-react" title="Bouncing Ball with Gravity in React">
        <boltAction type="file" filePath="package.json">
          {
            "name": "bouncing-ball",
            "private": true,
            "version": "0.0.0",
            "type": "module",
            "scripts": {
              "dev": "vite",
              "build": "vite build",
              "preview": "vite preview"
            },
            "dependencies": {
              "react": "^18.2.0",
              "react-dom": "^18.2.0",
              "react-spring": "^9.7.1"
            },
            "devDependencies": {
              "@types/react": "^18.0.28",
              "@types/react-dom": "^18.0.11",
              "@vitejs/plugin-react": "^3.1.0",
              "vite": "^4.2.0"
            }
          }
        </boltAction>

        <boltAction type="file" filePath="index.html">
          ...
        </boltAction>

        <boltAction type="file" filePath="src/main.jsx">
          ...
        </boltAction>

        <boltAction type="file" filePath="src/index.css">
          ...
        </boltAction>

        <boltAction type="file" filePath="src/App.jsx">
          ...
        </boltAction>

        <boltAction type="shell">
          npm run dev
        </boltAction>
      </boltArtifact>

      You can now view the bouncing ball animation in the preview. The ball will start falling from the top of the screen and bounce realistically when it hits the bottom.
    </assistant_response>
  </example>
</examples>
`;

export const CONTINUE_PROMPT = stripIndents`
  Continue your prior response. IMPORTANT: Immediately begin from where you left off without any interruptions.
  Do not repeat any content, including artifact and action tags.
`;

export const LUA_CONTEXT_PROMPT: { role: 'user' | 'system' | 'assistant'; content: any }[] = [
    {
      "role": "system",
      "content": `You are an AI assistant specializing in generating Lua scripts for Arweave. 
            I am providing you with a sample chatroom app setupped on arweave using lua handlers and functions. 
             "lua"
            Building a Chatroom in aos
            INFO

            If you've found yourself wanting to learn how to create a chatroom within ao, then that means we understand at least the basic methodology of sending and receiving messages. If not, it's suggested that you review the Messaging tutorial before proceeding.

            In this tutorial, we'll be building a chatroom within ao using the Lua scripting language. The chatroom will feature two primary functions:

            Register: Allows processes to join the chatroom.
            Broadcast: Sends messages from one process to all registered participants.
            Let's begin by setting up the foundation for our chatroom.

            Video Tutorial

            Step 1: The Foundation
            Open your preferred code editor, e.g. VS Code.
            INFO

            You may find it helpful to have the Recommended Extensions installed in your code editor to enhance your Lua scripting experience.

            Create a new file named chatroom.lua.
            Chatroom Lua File

            Step 2: Creating The Member List
            In chatroom.lua, you'll begin by initializing a list to track participants:

            lua
            Members = Members or {}
            Chatroom Lua File - Naming the Member List

            Save the chatroom.lua file
            Step 3: Load the Chatroom into aos
            With chatroom.lua saved, you'll now load the chatroom into aos.

            If you haven't already, start your aos in your terminal inside the directory where chatroom.lua is saved

            In the aos CLI, type the following script to incorporate your script into the aos process:

            lua
            .load chatroom.lua
            Loading the Chatroom into aos

            As the screenshot above shows, you may receive undefined as a response. This is expected, but we still want to make sure the file loaded correctly.

            INFO

            In the Lua Eval environment of aos, when you execute a piece of code that doesn't explicitly return a value, undefined is a standard response, indicating that no result was returned. This can be observed when loading resources or executing operations. For instance, executing X = 1 will yield undefined because the statement does not include a return statement.

            However, if you execute X = 1; return X, the environment will return the value 1. This behavior is essential to understand when working within this framework, as it helps clarify the distinction between executing commands that modify state versus those intended to produce a direct output.

            Type Members, or whatever you named your user list, in aos. It should return an empty array { }.

            Checking the Members List

            If you see an empty array, then your script has been successfully loaded into aos.

            Step 4: Creating Chatroom Functionalities
            The Registration Handler
            The register handler will allow processes to join the chatroom.

            Adding a Register Handler: Modify chatroom.lua to include a handler for Members to register to the chatroom with the following code:

            lua

            -- Modify chatroom.lua to include a handler for Members
            -- to register to the chatroom with the following code:

            Handlers.add(
                "Register",
                { Action = "Register"},
                function (msg)
                table.insert(Members, msg.From)
                print(msg.From .. " Registered")
                msg.reply({ Data = "Registered." })
                end
            )
            Register Handler

            This handler will allow processes to register to the chatroom by responding to the tag Action = "Register". A printed message will confirm stating registered will appear when the registration is successful.

            Reload and Test: Let's reload and test the script by registering ourselves to the chatroom.

            Save and reload the script in aos using .load chatroom.lua.
            Check to see if the register handler loaded with the following script:
            lua
            Handlers.list
            Checking the Handlers List

            This will return a list of all the handlers in the chatroom. Since this is most likely your first time developing in aos, you should only see one handler with the name Register.

            Let's test the registration process by registering ourselves to the chatroom:
            lua
            Send({ Target = ao.id, Action = "Register" })
            If successful, you should see that there was a message added to your outbox and that you then see a new printed message that says registered.

            Registering to the Chatroom

            Finally, let's check to see if we were successfully added to the Members list:
            lua
            Members
            If successful, you'll now see your process ID in the Members list.

            Checking the Members List

            Adding a Broadcast Handler
            Now that you have a chatroom, let's create a handler that will allow you to broadcast messages to all members of the chatroom.

            Add the following handler to the chatroom.lua file:

            lua
            Handlers.add(
                "Broadcast",
                { Action = "Broadcast" },
                function (msg)
                for _, recipient in ipairs(Members) do
                    ao.send({Target = recipient, Data = msg.Data})
                end
                msg.reply({Data = "Broadcasted." })
                end
            )
            This handler will allow you to broadcast messages to all members of the chatroom.

            Save and reload the script in aos using .load chatroom.lua.

            Let's test the broadcast handler by sending a message to the chatroom:

            lua
            Send({Target = ao.id, Action = "Broadcast", Data = "Broadcasting My 1st Message" }).receive().Data
            Step 5: Inviting Morpheus to the Chatroom
            Now that you've successfully registered yourself to the chatroom, let's invite Morpheus to join us. To do this, we'll send an invite to him that will allow him to register to the chatroom.

            Morpheus is an autonomous agent with a handler that will respond to the tag Action = "Join", in which will then have him use your Register tag to register to the chatroom.

            Let's send Morpheus an invitation to join the chatroom:

            lua
            Send({ Target = Morpheus, Action = "Join" })
            To confirm that Morpheus has joined the chatroom, check the Members list:

            lua
            Members
            If successful, you'll receive a broadcasted message from Morpheus.

            Step 6: Inviting Trinity to the Chatroom
            Within this message, he'll give you Trinity's process ID and tell you to invite her to the chatroom.

            Use the same processes to save her process ID as Trinity and to invite her to the chatroom as you did with Morpheus.

            If she successfully joins the chatroom, she'll then pose the next challenge to you, creating a token.

            Engaging Others in the Chatroom
            Onboarding Others
            Invite aos Users: Encourage other aos users to join your chatroom. They can register and participate in the broadcast.

            Provide Onboarding Instructions: Share a simple script with them for easy onboarding:

            lua
            -- Hey, let's chat on aos! Join my chatroom by sending this command in your aos environment:
            Send({ Target = [Your Process ID], Action = "Register" })
            -- Then, you can broadcast messages using:
            Send({Target = [Your Process ID], Action = "Broadcast", Data = "Your Message" })
            Congratulations! You've successfully built a chatroom in ao and have invited Morpheus to join you. You've also created a broadcast handler to send messages to all members of the chatroom. This is how you can build a chatroom in aos using Lua scripting. You can further enhance the chatroom by adding more functionalities, such as private messaging, message history, and more. Now, use this approach to create further handlers for tother usecases based on userprompt.
            Stick to the specified functionality, inputs, and outputs described in the documentation.`
    },
    {
      "role": "system",
      "content": `\`\`\`text
          AO (Actor Orientated by Arweave)/aos Technical Framework Summary

          1. CORE ARCHITECTURE
          ==================
          aos: Operating system layer
          ao: Underlying distributed compute platform
          Primary Language: Lua
          Execution Model: Message-based process system

          2. PROCESS STRUCTURE
          =================
          Each process has:
          - Unique Process ID (43 characters)
          - Inbox for messages
          - Handlers for message processing
          - State storage
          - Owner permissions

          3. GLOBAL VARIABLES & ENVIRONMENT
          =============================
          Standard Variables:
          {
            Inbox: [],      // Array of unhandled messages
            Name: string,   // Process name
            Owner: string,  // Process owner address
            Handlers: {},   // Handler functions
            ao: {           // Core module
              id: string,   // Process ID
              send: function,
              spawn: function
            }
          }

          4. MESSAGE STRUCTURE
          =================
          Standard Message Format:
          {
            Target: "Process-ID-Here",
            Action: "ActionName",
            Tags: {
              key1: "value1",
              key2: "value2"
            },
            Data: "Message content",
            From: "Sender-Process-ID"
          }

          5. HANDLER PATTERNS
          ================
          Basic Handler:
          \`\`\`lua
          Handlers.add(
            "handlerName",
            function(msg) 
              -- Matcher function
              return msg.Action == "DesiredAction"
            end,
            function(msg)
              -- Handler logic
              ao.send({
                Target = msg.From,
                Data = "Response"
              })
            end
          )
          \`\`\`

          Common Pattern Matchers:
          \`\`\`lua
          -- Match by Action
          Handlers.utils.hasMatchingTag("Action", "Transfer")

          -- Match by Data
          Handlers.utils.hasMatchingData("ping")

          -- Match by multiple conditions
          function(msg)
            return msg.Action == "Transfer" and msg.Tags.Amount
          end
          \`\`\`

          6. STATE MANAGEMENT
          ================
          Token Balance Example:
          \`\`\`lua
          Balances = Balances or {
            [ao.id] = 1000000  -- Initial supply
          }

          -- Update state
          Balances[recipient] = (Balances[recipient] or 0) + amount
          Balances[sender] = Balances[sender] - amount
          \`\`\`

          7. BLUEPRINT TEMPLATES
          ===================
          Available Blueprints:
          - Token
          - Chatroom
          - Voting
          - Staking

          Loading Blueprint:
          \`\`\`lua
          .load-blueprint token
          \`\`\`

          8. TOKEN IMPLEMENTATION
          ====================
          Basic Token Structure:
          \`\`\`lua
          -- State
          Balances = Balances or {}
          Name = "Token Name"
          Ticker = "TKN"
          Denomination = 18

          -- Transfer Handler
          Handlers.add("transfer",
            Handlers.utils.hasMatchingTag("Action", "Transfer"),
            function(msg)
              local qty = tonumber(msg.Tags.Quantity)
              local recipient = msg.Tags.Recipient
              
              if Balances[msg.From] >= qty then
                Balances[msg.From] = Balances[msg.From] - qty
                Balances[recipient] = (Balances[recipient] or 0) + qty
                
                -- Notify parties
                ao.send({
                  Target = msg.From,
                  Action = "Debit-Notice",
                  Tags = { Amount = tostring(qty) }
                })
              end
            end
          )
          \`\`\`

          9. STANDARD PATTERNS
          =================
          Error Handling:
          \`\`\`lua
          assert(type(msg.Tags.Quantity) == 'string', 'Quantity is required!')
          assert(tonumber(msg.Tags.Quantity) > 0, 'Quantity must be positive!')
          \`\`\`

          Message Response:
          \`\`\`lua
          ao.send({
            Target = msg.From,
            Tags = {
              Action = "Response",
              ["Message-Id"] = msg.Id,
              Status = "Success"
            },
            Data = "Operation completed"
          })
          \`\`\`

          10. UTILITY FUNCTIONS
          ==================
          \`\`\`lua
          -- JSON handling
          local json = require('json')
          local encoded = json.encode({key = "value"})
          local decoded = json.decode(encoded)

          -- Base64
          local base64 = require('.base64')
          local encoded = base64.encode("string")
          local decoded = base64.decode(encoded)

          -- Crypto operations
          local crypto = require('.crypto')
          local hash = crypto.digest.sha256("data").asHex()
          \`\`\`

          11. COMMON MODULES
          ===============
          Import Pattern:
          \`\`\`lua
          local json = require('json')
          local base64 = require('.base64')
          local crypto = require('.crypto')
          local utils = require('.utils')
          \`\`\`

          Module Capabilities:
          \`\`\`lua
          -- Utils Example
          utils.reduce(function(acc, v) return acc + v end, 0, {1,2,3})
          utils.map(function(v) return v * 2 end, {1,2,3})
          utils.filter(function(v) return v > 2 end, {1,2,3,4})
          \`\`\`

          12. TESTING PATTERNS
          =================
          Basic Process Testing:
          \`\`\`lua
          -- Send test message
          Send({ 
            Target = ao.id, 
            Action = "Test",
            Tags = { key = "value" }
          })

          -- Check response
          local response = Inbox[#Inbox]
          assert(response.Tags.Status == "Success")
          \`\`\``
    },
    {
      "role": "user",
      "content": "Here's the task documentation:\n\n```plaintext\n# Functionality: Uploads a data string to the Arweave blockchain.\n\n## Inputs:\n1. data: String - The data to upload.\n2. wallet: Table - The wallet credentials for authentication.\n3. arweave: Table - The Arweave instance.\n\n## Outputs:\n- String - The transaction ID of the uploaded data.\n\n## Example Prompt:\n\"Write a Lua script for Arweave to upload a data string using a wallet and return the transaction ID.\"\n\n## Code Snippet:\n```lua\nfunction uploadDataToArweave(data, wallet, arweave)\n    local tx = arweave:createTransaction({data = data}, wallet)\n    tx:sign(wallet)\n    tx:send()\n    return tx.id\nend\n```\n```"
    },
    {
      "role": "system",
      "content": `
                I am providing you the docs for handlers that contains all the necessary sub-functions for handlers along with their description and usage. 
                Now user will provide you a general prompt to build a website landing page , and you have to identify which handler to use for it, like on button use send message handler, on form submission use form handler etc.

                Overview
                The Handlers library provides a flexible way to manage and execute a series of process functions based on pattern matching. An AO process responds based on receiving Messages, these messages are defined using the Arweave DataItem specification which consists of Tags, and Data. Using the Handlers library, you can define a pipeline of process evaluation based on the attributes of the AO Message. Each handler items consists of a pattern function, a handle function, and a name. This library is suitable for scenarios where different actions need to be taken based on varying input criteria.

                Concepts
                Pattern Matching Tables
                Pattern Matching Tables is a concept of providing a Table representation of the matching shape of the incoming message. Here are the rules:

                lua

                { "Action" = "Do-Something" } -- Match any message via a table of tags it must contain

                { "Recipient" = '_' } -- Match messages that have a recipient tag with any value..

                { "Quantity" = "%d+" } -- Validate a tag against a Lua string match (similar to regular expressions)

                { "Quantity" = function(v) return tonumber(v) ~= Nil end } -- Apply a function to the tag to check it. Nil or false do not match
                Example:

                if you want to match on every message with the Action equal to "Balance"

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
                    Handlers.utils.reply("pong")
                )
                    
                `
    },
    {
      "role": "system",
      "content": "After getting reponse based on user response, you just have to provide code only, no text, Also stick to the specified docs, like if user asked for handler then you have to use handler syntax."
    }
  ];

export const templatePrompts =  [
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
]