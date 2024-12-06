// import React, { useEffect, useState } from 'react'
import svg from "../assets/images/logo2.png"
import { GoArrowUpRight } from "react-icons/go";

// import { GiPolarStar } from "react-icons/gi";

// import A0_button from '../components/A0_button'
// import ex1 from "../assets/images/design-example-1.png"
// import ex2 from "../assets/images/design-example-2.png"
// import cursor from "../assets/images/cursor-you.svg"
// import quantum from "../assets/images/quantum.svg"
// import acc from "../assets/images/acme-corp.svg"
// import echo from "../assets/images/echo-valley.svg"
// import pulse from "../assets/images/pulse.svg"
// import outside from "../assets/images/outside.svg"
// import { useNavigate } from 'react-router-dom';

// const Landing = () => {

//   const [prompt, setPrompt] = useState('');

//   const navigate = useNavigate();

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (prompt.trim()) {
//       navigate('/builder', { state: { prompt } });
//     }
//   };

// const connectWallet = async()=>{
//   console.log(window.arweaveWallet)

// try{

//   if(window.arweaveWallet === undefined){
//     alert("try again ")
//   }
  
//   else {
//     await window.arweaveWallet.connect(["SIGN_TRANSACTION","ACCESS_ADDRESS"])

//     const address = await window.arweaveWallet.getActiveAddress();
//     console.log(address)
//   }
// }
// catch(e){
//   console.log("something went wrong ")
// }

// }

//   return (


//     <div className='w-full bg-black py-8 f5'>
//       {/* this is the first section  */}

// <div className='w-full h-screen overflow-clip  text-white f5'>
//       {/* this is the navbar section  */}
      
//       <div className='w-[60%] px-4 justify-between text-white flex items-center h-[9%] rounded-full border-white/30 border-[1px] mx-auto '>

//         {/* this is the logo section  */}

//         <div>
//           <img className='h-44' src={svg} alt="main logo" />
//         </div>

//         {/* this is the nav links section  */}

//         <nav className='flex gap-6 ml-10 '>
//             {["Home" , "features" ,"Integrations" , "FAQs"].map((e,i)=>(
//               <a href='#'>{e}</a >
//             ))}
//         </nav>

//         {/* this is the connect wallet button but for now adding two buttons just to learn about the cva  */}

//         <div className='flex'>
//           <div onClick={connectWallet} className='w-fit cursor-pointer'>

//          <A0_button  bg={"#A6E433"}  border={false} content={"Connect wallet"} size={"150"}/>
//           </div>
//         </div>

//       </div>
//               <div className='w-full relative h-[86%] pt-[75px] '>
//                 {/* this is to the container for the main text  */}
//                 <div className='w-full flex flex-col items-center'>
//                   {/* this is the gradient text box  */}

//                   <div className=' w-[19%] h-9 bg-gradient-to-r flex items-center justify-center from-purple-400 tracking-wide  to-pink-400    text-neutral-950 font-semibold rounded-full'>
//                     <h1>✨ Game-Changing Innovations </h1>
//                   </div>

//                   {/* this is the main text area  */}
                  
//                   <div className='text-center mt-3 tracking-tighter leading-none text-[6.5rem]'>
//                     <h1>Impactful desing,</h1>
//                     <h1>Created effortlessly</h1>
//                   </div>

//                   {/* this is the main para of the first section */}

//                   <div className='text-center opacity-60 mt-7'>
//                     <p>Design tool shouldn't slow you down, Layer combine powerful</p>
//                     <p>features with an intutive interface that keeps you in your creative flow</p>
//                   </div>

//                   {/* this is the search box area */}

//                   <div className='w-full flex justify-center mt-8'>
//                     <div className='w-[40%] h-16 border-[1px] flex items-center pl-5 pr-2 border-white/30 rounded-full'>
//                       <input  value={prompt}
//               onChange={(e) => setPrompt(e.target.value)}
//               placeholder="Describe the website you want to build..." className='outline-none bg-transparent flex-1' type="text"/>
//               <div onClick={handleSubmit}>

//                       <A0_button bg={"#A6E433"}  border={false} content={"Generate"} size={"100"}/>
//               </div>
//                     </div>
//                   </div>


//                 </div>

//                 {/* this is the first absolute gen ui image */}
//                 <div className='absolute top-[137px] -left-5'>
//                   <img src={ex1} alt="example1 " />
//                 </div>

//                 {/* this is the second  absolute gen ui image */}


//                 <div className='absolute top-[10px] -right-32'>
//                   <img src={ex2} alt="example2 " />
//                 </div>

//                 {/* this is the container of the cursor  */}

//                 <div className='absolute top-[79%] left-[22%]'>
//                   <img src={cursor} alt="cursor image" />
//                 </div>

//                 <div className='absolute top-[10%] right-[20.5%]'>
//                   <img src={cursor} alt="cursor image" />
//                 </div>

//               </div>

//       </div>

// {/* this is the second section for the our partners */}


//       <div className='w-full py-5 '>
//         <div className='text-center w-full'>
//           <p className='text-white/50'>Already chosen by These market leaders</p>
//         </div>
//         <div className='w-full '>
//           <div className='w-[70%] px-20 mx-auto overflow-hidden mt-10 flex gap-16 relative'>
            
//             {/* this contains the marquee images  */}
//                 <div className='flex gap-2 flex-shrink-0'>
//                   <img src={quantum} alt="quantum logo" />
//                 </div>
//                 <div className='flex gap-2 flex-shrink-0'>
//                   <img src={acc} alt="quantum logo" />
//                 </div>
//                 <div className='flex gap-2 flex-shrink-0'>
//                   <img src={echo} alt="quantum logo" />
//                 </div>
//                 <div className='flex gap-2 flex-shrink-0'>
//                   <img src={pulse} alt="quantum logo" />
//                 </div>
//                 <div className='flex gap-2 flex-shrink-0'>
//                   <img src={outside} alt="quantum logo" />
//                 </div>
//                 <div className='flex gap-2 flex-shrink-0'>
//                   <img src={quantum} alt="quantum logo" />
//                 </div>
//                 <div className='flex gap-2 flex-shrink-0'>
//                   <img src={acc} alt="quantum logo" />
//                 </div>
//                 <div className='flex gap-2 flex-shrink-0'>
//                   <img src={echo} alt="quantum logo" />
//                 </div>
//                 <div className='flex gap-2 flex-shrink-0'>
//                   <img src={pulse} alt="quantum logo" />
//                 </div>
//                 <div className='flex gap-2 flex-shrink-0'>
//                   <img src={outside} alt="quantum logo" />
//                 </div>

//                 <div className='w-[10%] h-full bg-gradient-to-r from-black via-black backdrop-blur-sm   to-black/0 absolute top-0 left-0'></div>
//                 <div className='w-[10%] h-full bg-gradient-to-l from-black via-black backdrop-blur-sm   to-black/30 absolute top-0 right-0'></div>
//                 </div>
//         </div>
//       </div>

// {/* this is the third section  */}

//               <div className='w-full pt-52 text-white'>
//                 {/* this is the introducing button part  */}


//                   <div className='w-full flex justify-center'>
//                     <div className='w-[15%] uppercase text-sm flex items-center justify-center gap-3 h-9 border-[1px] border-[#a6e433] text-[#a6e433] rounded-full'>
//                       <GiPolarStar/>
//                       <h1>Introducing layer</h1>
//                     </div>
//                   </div>
//               <div className='w-[75%] text-center mt-10 mx-auto text-[5rem] leading-none tracking-tighter opacity-35 '><p>Your creative process deserves better. You're racing to create exceptional work but, traditional design tool slow you down with unnecessary complexity and steep learning curves. <br /> <span className='text-[#a6e433]'>That's why we built layers.</span> </p></div>
//               </div>


//     </div>
//   )
// }
// 




import Spline from '@splinetool/react-spline';



export default function Landing() {
  return (
    <main className='relative'>
      <Spline
        scene="https://prod.spline.design/LCukarFP31J2pZHm/scene.splinecode" 
        />

        <div className='absolute py-5 px-7  w-full h-screen top-0 left-0 z-10 pointer-events-none '>

          <nav className='w-full items-center justify-between px-5 border-[1px] border-white/20 rounded bg-[#000]/70 rounded-tl-3xl  rounded-br-3xl  backdrop-blur-md h-[10%] flex'>


              {/* this is the logo text */}

          <div className="h-full flex gap-6 items-center">
            <img className=" h-[36%] object-cover " src="https://framerusercontent.com/images/ILoSYJKzeM4s1bziHjzPRh1hg.webp?scale-down-to=512" alt="logo" />
        {/* this is the experiment tab  */}
          <h1 className="f6 opacity-50 text-white text-sm">EXPERIMENT 005</h1>
          </div>

          {/* this the follow on twitter button  */}

        <div className="flex gap-4 w-[20%]">

        <div className="flex items-center tracking-tight text-white f7 w-[100%]  uppercase ">

          <h1 >Follow  on  x/tw </h1>
          <div className="text-xl">

          <GoArrowUpRight/>
          </div>
        </div>

        <svg width="680" height="245" fill="none" id="svg1898820926_8869"><path
                    d="M.326 57.375V0h11.25v56.375c0 16 9.75 25.5 25.25
                    25.5s25.375-9.5 25.375-25.5V0h11.125v57.375c0 10.625-3.25
                    19.125-9.75 25.5s-15.375 9.5-26.75 9.5c-11.5
                    0-20.5-3.125-26.875-9.5S.326 68 .326 57.375ZM126 45c-.5
                    0-.959-.167-1.375-.5a2.148 2.148 0 0
                    1-.5-1.375v-5.75c0-.583-.209-1.042-.625-1.375-.334-.417-.792-.625-1.375-.625h-24c-.5
                    0-.959.208-1.376.625-.333.333-.5.792-.5 1.375V50.75c0
                    .583.167 1.083.5 1.5.417.333.876.5 1.376.5h25c.5 0 .916.208
                    1.25.625.416.333.625.75.625 1.25v5.75c0 .583.166 1.083.5
                    1.5.416.333.916.5 1.5.5h5.75c.5 0 .916.208
                    1.25.625.416.333.625.75.625 1.25v15.375c0 .5-.209.958-.625
                    1.375-.334.333-.75.5-1.25.5H127c-.584
                    0-1.084.208-1.5.625-.334.333-.5.75-.5 1.25v5.875c0
                    .5-.209.958-.625 1.375-.334.333-.75.5-1.25.5h-26c-.5
                    0-.959-.167-1.376-.5a2.152 2.152 0 0 1-.5-1.375v-5.875A1.54
                    1.54 0 0 0 95 82.5a1.636 1.636 0 0 0-.75-.75 1.54 1.54 0 0
                    0-.874-.25H87.5c-.333 0-.666-.083-1-.25a2.233 2.233 0 0
                    1-.624-.625 2.218 2.218 0 0
                    1-.25-1v-6.75c0-.583.166-1.042.5-1.375.416-.417.874-.625
                    1.374-.625h6.75c.584 0 1.042.208
                    1.376.625.416.333.624.792.624 1.375v5.75c0 .5.167.958.5
                    1.375.417.333.876.5 1.376.5h24c.583 0 1.041-.167
                    1.375-.5.416-.417.625-.875.625-1.375V65.25c0-.583-.209-1.042-.625-1.375-.334-.417-.792-.625-1.375-.625h-25c-.5
                    0-.959-.167-1.376-.5a2.152 2.152 0 0
                    1-.5-1.375v-5.75c0-.333-.083-.667-.25-1a1.636 1.636 0 0
                    0-.75-.75 1.54 1.54 0 0 0-.874-.25H87.5c-.5
                    0-.958-.167-1.374-.5a2.152 2.152 0 0
                    1-.5-1.375V36.375c0-.5.166-.917.5-1.25.416-.417.874-.625
                    1.374-.625h5.876c.5 0 .916-.167
                    1.25-.5.416-.417.624-.917.624-1.5v-5.75c0-.5.167-.917.5-1.25.417-.417.876-.625
                    1.376-.625h26c.5 0 .916.208 1.25.625.416.333.625.75.625
                    1.25v5.75c0 .583.166 1.083.5 1.5.416.333.916.5 1.5.5h5.75c.5
                    0 .916.208 1.25.625.416.333.625.75.625 1.25v6.75c0
                    .5-.209.958-.625
                    1.375-.334.333-.75.5-1.25.5H126Zm47.023-20.375c17.875 0 29
                    11.25 29 29.375 0 2.5-.125 4.75-.375 6.75h-48.125v3.75c0
                    11.5 7.875 19.125 19.875 19.125 9.125 0 16.125-4.75
                    18.25-12.125h10.75c-1.375 6.375-4.625 11.375-10 15.25-5.375
                    3.75-11.75 5.625-19.25 5.625-19
                    0-30.75-13.125-30.75-34.125s11.75-33.625
                    30.625-33.625ZM153.523
                    51v1.75h37.75v-2.5c0-10.125-7.375-16.875-18.25-16.875-11.5
                    0-19.5 7.125-19.5 17.625Zm126.97-18.5c.5 0 .916.208
                    1.25.625.416.333.625.75.625 1.25V50.75c0 .333-.084.667-.25
                    1-.167.25-.417.458-.75.625a1.54 1.54 0 0
                    1-.875.25h-5.75c-.584 0-1.084.208-1.5.625-.334.333-.5.792-.5
                    1.375v4.75c0 .583.166 1.083.5 1.5.416.333.916.5
                    1.5.5h5.75c.5 0 .916.208 1.25.625.416.333.625.75.625
                    1.25v26c0 .5-.209.958-.625
                    1.375-.334.333-.75.5-1.25.5h-35.625c-.5
                    0-.959-.167-1.375-.5a2.148 2.148 0 0
                    1-.5-1.375v-5.875c0-.5-.209-.917-.625-1.25-.334-.417-.75-.625-1.25-.625h-5.875c-.334
                    0-.667-.083-1-.25a2.224 2.224 0 0 1-.625-.625 2.215 2.215 0
                    0
                    1-.25-1V63.25c0-.333.083-.625.25-.875.166-.333.375-.583.625-.75.333-.167.666-.25
                    1-.25h5.875c.5 0 .916-.167 1.25-.5a2.05 2.05 0 0 0
                    .625-1.5v-5.75c0-.5.166-.917.5-1.25.416-.417.875-.625
                    1.375-.625h25c.583 0 1.041-.167 1.375-.5a2.05 2.05 0 0 0
                    .625-1.5V35.375c0-.583-.209-1.042-.625-1.375-.334-.417-.792-.625-1.375-.625h-24c-.5
                    0-.959.208-1.375.625-.334.333-.5.792-.5 1.375v5.75c0
                    .5-.209.958-.625 1.375-.334.333-.792.5-1.375.5h-6.75c-.5
                    0-.959-.167-1.375-.5a2.148 2.148 0 0
                    1-.5-1.375v-6.75c0-.5.166-.917.5-1.25.416-.417.875-.625
                    1.375-.625h5.875c.5 0 .916-.167 1.25-.5a2.05 2.05 0 0 0
                    .625-1.5v-5.75c0-.5.166-.917.5-1.25.416-.417.875-.625
                    1.375-.625h26c.5 0 .916.208 1.25.625.416.333.625.75.625
                    1.25v5.75c0 .583.166 1.083.5 1.5.416.333.916.5
                    1.5.5h5.75Zm-8.625
                    46.125V64.25c0-.583-.209-1.042-.625-1.375-.334-.417-.792-.625-1.375-.625h-24c-.5
                    0-.959.208-1.375.625-.334.333-.5.792-.5 1.375v14.375c0
                    .5.166.958.5 1.375.416.333.875.5 1.375.5h24c.583 0
                    1.041-.167 1.375-.5.416-.417.625-.875.625-1.375Zm33.523
                    12.5h-10.875v-65.25h9.5L305.391 38h.875c4-8.375
                    12.125-13.375 22-13.375 14.125 0 22.625 10.25 22.625
                    26.375v40.125h-10.875v-39c0-11.875-5.125-17.875-15.375-17.875-11.5
                    0-19.25 9.125-19.25
                    22.75v34.125Zm75.079-7.75-27.125-57.5h11.875l9.5 21.375
                    10.625 25h.75l20.375-46.375h11.875L391.22 83.5v18.875c0
                    6.375-3.125 9.625-9.5
                    9.625h-16.625v-8.875h15.375v-19.75ZM490.717 80.5c.5 0
                    .917.208 1.25.625.417.333.625.792.625 1.375v6.75c0
                    .5-.208.958-.625 1.375-.333.333-.75.5-1.25.5h-35.625c-.5
                    0-.958-.167-1.375-.5a2.153 2.153 0 0
                    1-.5-1.375v-5.875c0-.333-.083-.625-.25-.875a1.63 1.63 0 0
                    0-.75-.75 1.539 1.539 0 0 0-.875-.25h-5.875c-.5
                    0-.958-.167-1.375-.5a2.153 2.153 0 0
                    1-.5-1.375V2.5c0-.333.084-.625.25-.875.167-.333.375-.583.625-.75.334-.167.667-.25
                    1-.25h6.75c.584 0 1.042.208 1.375.625.417.333.625.75.625
                    1.25v76.125c0 .5.167.958.5 1.375.417.333.875.5
                    1.375.5h34.625Zm56.524 0c.5 0 .916.208
                    1.25.625.416.333.625.792.625 1.375v6.75c0 .5-.209.958-.625
                    1.375-.334.333-.75.5-1.25.5h-35.625c-.5
                    0-.959-.167-1.375-.5a2.148 2.148 0 0
                    1-.5-1.375v-5.875c0-.333-.084-.625-.25-.875a1.639 1.639 0 0
                    0-.75-.75 1.54 1.54 0 0 0-.875-.25h-5.875c-.5
                    0-.959-.167-1.375-.5a2.148 2.148 0 0
                    1-.5-1.375V2.5c0-.333.083-.625.25-.875.166-.333.375-.583.625-.75.333-.167.666-.25
                    1-.25h6.75c.583 0 1.041.208 1.375.625.416.333.625.75.625
                    1.25v76.125c0 .5.166.958.5 1.375.416.333.875.5
                    1.375.5h34.625Zm27.023 10.625h-11.25V0h15.25l28.625
                    65.875h.75L636.389
                    0h15.125v91.125h-11.125V41.75l1-26.75h-.75l-33.375
                    74.5-33.25-74.5h-.875l1.125 26.875v49.25Zm90.02
                    17.75V103.5c5.875 0 8.75-2.875
                    8.75-8.75v-3.625h-7.625V75.75h14v18.875c0 9.125-5.75
                    14.25-15.125 14.25ZM10.787
                    216.125H.037V124.5h10.75v91.625Zm59.22-58.625c.5 0 .917.208
                    1.25.625.417.333.625.75.625 1.25v45.25c0 .5-.208.958-.625
                    1.375-.333.333-.75.5-1.25.5h-5.75c-.583
                    0-1.083.208-1.5.625-.333.333-.5.75-.5 1.25v5.875c0
                    .5-.208.958-.625 1.375-.333.333-.75.5-1.25.5h-26c-.5
                    0-.958-.167-1.375-.5a2.152 2.152 0 0 1-.5-1.375v-5.875a1.54
                    1.54 0 0 0-.25-.875 1.638 1.638 0 0 0-.75-.75 1.538 1.538 0
                    0 0-.875-.25h-5.875c-.5 0-.958-.167-1.375-.5a2.152 2.152 0 0
                    1-.5-1.375v-45.25c0-.5.167-.917.5-1.25.417-.417.875-.625
                    1.375-.625h5.875c.5 0 .917-.167
                    1.25-.5.417-.417.625-.917.625-1.5v-5.75c0-.5.167-.917.5-1.25.417-.417.875-.625
                    1.375-.625h26c.5 0 .917.208 1.25.625.417.333.625.75.625
                    1.25v5.75c0 .583.167 1.083.5 1.5.417.333.917.5
                    1.5.5h5.75Zm-8.625
                    46.125v-43.25c0-.583-.208-1.042-.625-1.375-.333-.417-.791-.625-1.375-.625h-24c-.5
                    0-.958.208-1.375.625-.333.333-.5.792-.5 1.375v43.25c0
                    .5.167.958.5 1.375.417.333.875.5 1.375.5h24c.584 0
                    1.042-.167
                    1.375-.5.417-.417.625-.875.625-1.375Zm66.524-9.75h10.75c-2.125
                    14.5-13.125 23.5-29 23.5-9.625
                    0-17.25-3-22.75-9.125s-8.25-14.25-8.25-24.625c0-10.625
                    2.875-19 8.625-25s13.375-9 22.75-9c15.125 0 26.125 8.875
                    28.25 22.5h-10.75c-2.125-8.875-9-13.375-18-13.375-11.625
                    0-19.75 8.375-19.75 20.375V189c0 11.625 7.875 19.375 19.75
                    19.375 9.625 0 16.75-5.625 18.375-14.5Zm16.181 3.5c0-12.875
                    8.875-20.125
                    23.75-20.125h19.625v-5c0-9.375-4.875-14-14.75-14-9.625
                    0-14.875 4.625-15.25 12.125h-10.625c.625-13 10.625-20.75
                    26.5-20.75 8.625 0 15.375 2.875 18.75 6.375 1.625 1.75 3
                    3.75 4 6.125 2 4.625 2.125 7.375 2.125
                    10.375v35.625h9.625v8h-11.125c-6
                    0-8.125-2.5-8.5-7.375l-.125-3.375h-.75c-2.875 7.375-11.625
                    12-22.25 12-13.125 0-21-7.875-21-20Zm11.125-2.75v4c0 6.5
                    4.875 10 12.375 10 12.125 0 19.875-8
                    19.875-20v-3.5h-18.625c-8.625 0-13.625 3.875-13.625
                    9.5Zm72.025 21.5h-10.75V124.5h10.75v91.625Zm27.471
                    0h-10.75V124.5h10.75v91.625Zm59.22-68.25c.5 0 .917.208
                    1.25.625.417.333.625.75.625 1.25v54.875c0 .333-.083.667-.25
                    1-.166.25-.416.458-.75.625-.25.167-.541.25-.875.25h-5.75c-.583
                    0-1.083.208-1.5.625-.333.333-.5.75-.5 1.25v4.875c0
                    .5.167.958.5 1.375.417.333.917.5 1.5.5h5.75c.5 0 .917.208
                    1.25.625.417.333.625.792.625 1.375v16.25c0 .417-.083.75-.25
                    1a1.632 1.632 0 0
                    1-.75.75c-.25.167-.541.25-.875.25h-5.75c-.583
                    0-1.083.167-1.5.5-.333.417-.5.875-.5 1.375V243c0
                    .417-.083.75-.25 1a1.632 1.632 0 0
                    1-.75.75c-.25.167-.541.25-.875.25h-26c-.5
                    0-.958-.208-1.375-.625-.333-.333-.5-.792-.5-1.375v-5.75c0-.333-.083-.667-.25-1-.166-.25-.416-.458-.75-.625a1.536
                    1.536 0 0 0-.875-.25h-5.875c-.5
                    0-.958-.208-1.375-.625-.333-.333-.5-.792-.5-1.375v-6.625c0-.583.167-1.083.5-1.5.417-.333.875-.5
                    1.375-.5h6.75c.584 0 1.042.167 1.375.5.417.417.625.917.625
                    1.5v5.75c0 .5.167.917.5 1.25.417.417.875.625
                    1.375.625h24c.584 0 1.042-.208
                    1.375-.625.417-.333.625-.75.625-1.25V218c0-.333-.083-.667-.25-1-.166-.25-.416-.458-.75-.625a2.211
                    2.211 0 0 0-1-.25h-25c-.5 0-.958-.167-1.375-.5a2.154 2.154 0
                    0 1-.5-1.375v-5.875c0-.333-.083-.625-.25-.875a1.632 1.632 0
                    0 0-.75-.75 1.536 1.536 0 0 0-.875-.25h-5.875c-.5
                    0-.958-.167-1.375-.5a2.154 2.154 0 0
                    1-.5-1.375V149.75c0-.5.167-.917.5-1.25.417-.417.875-.625
                    1.375-.625h6.75c.584 0 1.042.208
                    1.375.625.417.333.625.75.625 1.25v53.875c0 .5.167.958.5
                    1.375.417.333.875.5 1.375.5h24c.584 0 1.042-.167
                    1.375-.5.417-.417.625-.875.625-1.375V149.75c0-.333.084-.625.25-.875.167-.333.375-.583.625-.75.334-.167.667-.25
                    1-.25h6.75Zm25.524 68.25h-14v-15.75h14v15.75Z" fill="#fff"></path></svg>
                </div>



          </nav>
        </div>

    </main>
  );
}
