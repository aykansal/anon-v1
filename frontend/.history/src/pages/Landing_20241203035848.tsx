import React from 'react'
import svg from "../assets/images/logo.svg"

const Landing = () => {
  // going through whole revamping shit 

  // not going to be responsive though 

  // still will be responsive soon enough 

  // lessgoo
  return (

    <div className='w-full h-screen bg-black py-8 f5'>
      {/* this is the navbar section  */}
      
      <div className='w-[60%] text-white flex items-center h-[9%] rounded-full border-white/30 border-[1px] mx-auto '>

        {/* this is the logo section  */}

        <div>
          <img src={svg} alt="main logo" />
        </div>

        {/* this is the nav links section  */}

        <nav className='flex gap-6  '>
            {["Home" , "features" ,"Integrations" , "FAQs"].map((e,i)=>(
              <a href='#'>{e}</a >
            ))}
        </nav>

        {/* this is the connect wallet button but for now adding two buttons just to learn about the cva  */}

        <div>
          <button className=' w-24 h-12 border-[2px] border-white/50 px-2  rounded-full'>sign up</button>
        </div>

      </div>
    </div>
  )
}

export default Landing