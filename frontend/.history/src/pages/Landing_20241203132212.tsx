import React, { useEffect, useState } from 'react'
import svg from "../assets/images/logo2.png"
import { GiPolarStar } from "react-icons/gi";

import A0_button from '../components/A0_button'
import ex1 from "../assets/images/design-example-1.png"
import ex2 from "../assets/images/design-example-2.png"
import cursor from "../assets/images/cursor-you.svg"
import quantum from "../assets/images/quantum.svg"
import acc from "../assets/images/acme-corp.svg"
import echo from "../assets/images/echo-valley.svg"
import pulse from "../assets/images/pulse.svg"
import outside from "../assets/images/outside.svg"
import { useNavigate } from 'react-router-dom';

const Landing = () => {

  const [prompt, setPrompt] = useState('');

  const navigate = useNavigate();

  

const connectWallet = async()=>{
  console.log(window.arweaveWallet)

try{

  if(window.arweaveWallet === undefined){
    alert("try again ")
  }
  
  else {
    await window.arweaveWallet.connect(["SIGN_TRANSACTION","ACCESS_ADDRESS"])

    const address = await window.arweaveWallet.getActiveAddress();
    console.log(address)
  }
}
catch(e){
  console.log("something went wrong ")
}

}

  return (


    <div className='w-full bg-black py-8 f5'>
      {/* this is the first section  */}

<div className='w-full h-screen overflow-clip  text-white f5'>
      {/* this is the navbar section  */}
      
      <div className='w-[60%] px-4 justify-between text-white flex items-center h-[9%] rounded-full border-white/30 border-[1px] mx-auto '>

        {/* this is the logo section  */}

        <div>
          <img className='h-44' src={svg} alt="main logo" />
        </div>

        {/* this is the nav links section  */}

        <nav className='flex gap-6 ml-10 '>
            {["Home" , "features" ,"Integrations" , "FAQs"].map((e,i)=>(
              <a href='#'>{e}</a >
            ))}
        </nav>

        {/* this is the connect wallet button but for now adding two buttons just to learn about the cva  */}

        <div className='flex'>
          <div onClick={connectWallet} className='w-fit cursor-pointer'>

         <A0_button  bg={"#A6E433"}  border={false} content={"Connect wallet"} size={"150"}/>
          </div>
        </div>

      </div>
              <div className='w-full relative h-[86%] pt-[75px] '>
                {/* this is to the container for the main text  */}
                <div className='w-full flex flex-col items-center'>
                  {/* this is the gradient text box  */}

                  <div className=' w-[17%] h-9 bg-gradient-to-r flex items-center justify-center from-purple-400 tracking-wide  to-pink-400 text-neutral-950 font-semibold rounded-full'>
                    <h1>✨$7.5M seeds round raised</h1>
                  </div>

                  {/* this is the main text area  */}
                  
                  <div className='text-center mt-3 tracking-tighter leading-none text-[6.5rem]'>
                    <h1>Impactful desing,</h1>
                    <h1>Created effortlessly</h1>
                  </div>

                  {/* this is the main para of the first section */}

                  <div className='text-center opacity-60 mt-7'>
                    <p>Design tool shouldn't slow you down, Layer combine powerful</p>
                    <p>features with an intutive interface that keeps you in your creative flow</p>
                  </div>

                  {/* this is the search box area */}

                  <div className='w-full flex justify-center mt-8'>
                    <div className='w-[40%] h-16 border-[1px] flex items-center pl-5 pr-2 border-white/30 rounded-full'>
                      <input className='outline-none bg-transparent flex-1' type="text" placeholder='Enter Product Description here' />
                      <A0_button bg={"#A6E433"}  border={false} content={"Generate"} size={"100"}/>
                    </div>
                  </div>


                </div>

                {/* this is the first absolute gen ui image */}
                <div className='absolute top-[137px] -left-5'>
                  <img src={ex1} alt="example1 " />
                </div>

                {/* this is the second  absolute gen ui image */}


                <div className='absolute top-[10px] -right-32'>
                  <img src={ex2} alt="example2 " />
                </div>

                {/* this is the container of the cursor  */}

                <div className='absolute top-[79%] left-[22%]'>
                  <img src={cursor} alt="cursor image" />
                </div>

                <div className='absolute top-[10%] right-[20.5%]'>
                  <img src={cursor} alt="cursor image" />
                </div>

              </div>

      </div>

{/* this is the second section for the our partners */}


      <div className='w-full py-5 '>
        <div className='text-center w-full'>
          <p className='text-white/50'>Already chosen by These market leaders</p>
        </div>
        <div className='w-full '>
          <div className='w-[70%] px-20 mx-auto overflow-hidden mt-10 flex gap-16 relative'>
            
            {/* this contains the marquee images  */}
                <div className='flex gap-2 flex-shrink-0'>
                  <img src={quantum} alt="quantum logo" />
                </div>
                <div className='flex gap-2 flex-shrink-0'>
                  <img src={acc} alt="quantum logo" />
                </div>
                <div className='flex gap-2 flex-shrink-0'>
                  <img src={echo} alt="quantum logo" />
                </div>
                <div className='flex gap-2 flex-shrink-0'>
                  <img src={pulse} alt="quantum logo" />
                </div>
                <div className='flex gap-2 flex-shrink-0'>
                  <img src={outside} alt="quantum logo" />
                </div>
                <div className='flex gap-2 flex-shrink-0'>
                  <img src={quantum} alt="quantum logo" />
                </div>
                <div className='flex gap-2 flex-shrink-0'>
                  <img src={acc} alt="quantum logo" />
                </div>
                <div className='flex gap-2 flex-shrink-0'>
                  <img src={echo} alt="quantum logo" />
                </div>
                <div className='flex gap-2 flex-shrink-0'>
                  <img src={pulse} alt="quantum logo" />
                </div>
                <div className='flex gap-2 flex-shrink-0'>
                  <img src={outside} alt="quantum logo" />
                </div>

                <div className='w-[10%] h-full bg-gradient-to-r from-black via-black backdrop-blur-sm   to-black/0 absolute top-0 left-0'></div>
                <div className='w-[10%] h-full bg-gradient-to-l from-black via-black backdrop-blur-sm   to-black/30 absolute top-0 right-0'></div>
                </div>
        </div>
      </div>

{/* this is the third section  */}

              <div className='w-full pt-52 text-white'>
                {/* this is the introducing button part  */}


                  <div className='w-full flex justify-center'>
                    <div className='w-[15%] uppercase text-sm flex items-center justify-center gap-3 h-9 border-[1px] border-[#a6e433] text-[#a6e433] rounded-full'>
                      <GiPolarStar/>
                      <h1>Introducing layer</h1>
                    </div>
                  </div>
              <div className='w-[75%] text-center mt-10 mx-auto text-[5rem] leading-none tracking-tighter opacity-35 '><p>Your creative process deserves better. You're racing to create exceptional work but, traditional design tool slow you down with unnecessary complexity and steep learning curves. <br /> <span className='text-[#a6e433]'>That's why we built layers.</span> </p></div>
              </div>


    </div>
  )
}

export default Landing