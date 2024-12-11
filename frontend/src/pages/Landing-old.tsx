import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GiPolarStar } from "react-icons/gi";
import A0_button from "../components/A0_button";

import svg from "../assets/images/logo2.png";
import ex1 from "../assets/images/design-example-1.png";
import ex2 from "../assets/images/design-example-2.png";

declare global {
  interface Window {
    arweaveWallet: any;
  }
}

const Landing = () => {
  const navigate = useNavigate();
  const [prompt, setPrompt] = useState("");
  const [connected, setConnected] = useState(false);

  // Handles prompt submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!connected) {
      connectWallet();
    } else {
      if (prompt.trim().length < 10) {
        alert("Prompt should be greater than 10 characters");
        return;
      } else {
        navigate("/builder", { state: { prompt } });
      }
    }
  };

  // Connect wallet function
  const connectWallet = async () => {
    try {
      if (!window.arweaveWallet) {
        alert("Please install the ArConnect Wallet");
      } else {
        await window.arweaveWallet.connect([
          "SIGN_TRANSACTION",
          "ACCESS_ADDRESS",
        ]);
        const address = await window.arweaveWallet.getActiveAddress();
        console.log(address);
        setConnected(true);
      }
    } catch (error) {
      console.error("Something went wrong", error);
    }
  };

  return (
    <div className="w-full bg-black py-8 f5">
      {/* Navbar Section */}
      <div className="w-full h-screen overflow-clip text-white f5">
        <div className="w-[60%] px-4 justify-between text-white flex items-center h-[9%] rounded-full border-white/30 border-[1px] mx-auto">
          <div>
            <img className="h-44" src={svg} alt="main logo" />
          </div>
          <div className="flex">
            <div onClick={connectWallet} className="w-fit cursor-pointer">
              <A0_button
                bg={"transparent"}
                border={true}
                content={"Projects"}
                size={"150"}
              />
            </div>
          </div>
        </div>

        {/* Main Section */}
        <div className="w-full relative h-[86%] pt-[75px]">
          <div className="w-full flex flex-col items-center">
            <div className="w-[20%] uppercase mb-5 text-sm flex items-center justify-center gap-3 h-9 border-[1px] border-[#a6e433] text-[#a6e433] rounded-full">
              <GiPolarStar />
              <h1>Game-Changing Innovation</h1>
            </div>

            <div className="text-center mt-3 tracking-tighter leading-none text-[5.5rem]">
              <h1>Impactful design,</h1>
              <h1>Created effortlessly</h1>
            </div>

            <div className="text-center opacity-60 mt-7">
              <p>
                Design tools shouldn't slow you down, Anon turns your powerful
              </p>
              <p>and creative ideas into reality with single prompt.
              </p>
            </div>
            <div className="w-full flex justify-center mt-8">
              <div className="w-[40%] h-16 border-[1px] flex items-center pl-5 pr-2 border-white/30 rounded-full">
                <input
                  value={prompt}
                  onKeyDown={(e) => e.key === "Enter" && handleSubmit(e)}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="Describe the website you want to build..."
                  className="outline-none bg-transparent flex-1"
                  type="text"
                />
                <div onClick={handleSubmit}>
                  <A0_button
                    bg={"#A6E433"}
                    border={false}
                    content={connected ? "Generate" : "Connect"}
                    size={"100"}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Example UI Images */}
          <div className="absolute top-[137px] -left-5">
            <img src={ex1} alt="example1" />
          </div>
          <div className="absolute top-[10px] -right-32">
            <img src={ex2} alt="example2" />
          </div>

          {/* Cursor Image */}
          {/* {[cursor, cursor].map((src, index) => (
            <div
              key={index}
              className={`absolute top-[${index === 0 ? "79%" : "10%"}] ${
                index === 0 ? "left-[22%]" : "right-[20.5%]"
              }`}
            >
              <img src={src} alt="cursor" />
            </div>
          ))} */}
        </div>
      </div>

      {/* Partner Logos Section */}
      {/* <div className="w-full py-5">
        <div className="text-center w-full">
          <p className="text-white/50">
            Already chosen by These market leaders
          </p>
        </div>
        <div className="w-full">
          <div className="w-[70%] px-20 mx-auto overflow-hidden mt-10 flex gap-16 relative">
            {partnerLogos.map((logo, index) => (
              <div key={index} className="flex gap-2 flex-shrink-0">
                <img src={logo} alt={`partner logo ${index}`} />
              </div>
            ))}

            <div className="w-[10%] h-full bg-gradient-to-r from-black via-black backdrop-blur-sm to-black/0 absolute top-0 left-0"></div>
            <div className="w-[10%] h-full bg-gradient-to-l from-black via-black backdrop-blur-sm to-black/30 absolute top-0 right-0"></div>
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default Landing;

// import Spline from '@splinetool/react-spline';

// export default function Landing() {
//   return (
//     <main className='relative'>
//       <Spline
//         scene="https://prod.spline.design/LCukarFP31J2pZHm/scene.splinecode"
//         />

//         <div className='absolute py-5 px-7 bg-black/10  w-fit h-fit  top-0 left-0 z-10 pointer-events-none '>

//           <nav className='w-full items-center justify-between px-5 border-[1px] border-white/20 rounded bg-[#000]/70 rounded-tl-3xl  rounded-br-3xl  backdrop-blur-md h-[10%] flex'>

//               {/* this is the logo text */}

//           <div className="h-full flex gap-6 items-center">
//             <img className=" h-[36%] object-cover " src="https://framerusercontent.com/images/ILoSYJKzeM4s1bziHjzPRh1hg.webp?scale-down-to=512" alt="logo" />
//         {/* this is the experiment tab  */}
//           <h1 className="f6 opacity-50 text-white text-sm">EXPERIMENT 005</h1>
//           </div>

//           {/* this the follow on twitter button  */}

//         <div className="flex gap-4 w-[20%]">

//         <div className="flex items-center gap-2 text-white f7 w-[100%]  uppercase ">

//           <h1 >Follow</h1>
//           <h1>on</h1>
//           <h1>x/tw</h1>
//           <div className="text-xl ">

//           <GoArrowUpRight/>
//           </div>
//         </div>

//         <div className="border-[1px] text-white f6 text-xs w-[50%] py-3  flex items-center rounded-lg rounded-tl-none rounded-br-none  justify-center uppercase border-white/40  ">
//           <h1>Projects</h1>
//           <div className="text-xl">
//           <GoArrowUpRight/>
//           </div>

//         </div>

//                 </div>

//           </nav>

//           <div className="w-full h-[90%] relative ">
//             <div className="absolute bottom-44 leading-[5rem] text-7xl f7 tracking-tight text-white  left-10">
//               <h1>Powerfull Solution,</h1>
//               <h1>Created Effortlessly</h1>
//             </div>

//             <div className="w-full h-[10%] bottom-10 left-10 text-white f7 absolute flex">
//                   <div className="w-1/2 flex">
//                     <h1 className="opacity-70 text-xl w-[62%]">Idea into Reality with large Language models ,locally and securely.</h1>
//                     <div className="w-[15%] ml-2 mt-2 flex items-center justify-center h-[70%] bg-gradient-to-br from-gray-300 via-gray-100 to-gray-300 rounded-lg rounded-tl-none text-black shadow-[inset_0_2px_5px_rgba(255,255,255,0.5),_0_4px_10px_rgba(0,0,0,0.2

// ">
//   <h1>Explore</h1>
// </div>

//                   </div>
//             </div>

//           </div>
//             <div className="w-full h-[10%]  bg-gradient-to-t from-black  via-black/80 to-black/0 absolute bottom-0 left-0 "></div>
//         </div>

//     </main>
//   );
// }
