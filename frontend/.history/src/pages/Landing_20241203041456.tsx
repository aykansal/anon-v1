import React from 'react'
import svg from "../assets/images/logo.svg"
import A0_button from '../components/A0_button'

const Landing = () => {
  // going through whole revamping shit 

  // not going to be responsive though 

  // still will be responsive soon enough 

  // lessgoo
  return (

    <div className='w-full h-screen bg-black py-8 f5'>
      {/* this is the navbar section  */}
      
      <div className='w-[60%] px-6 justify-between text-white flex items-center h-[9%] rounded-full border-white/30 border-[1px] mx-auto '>

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

        <div className='flex gap-4'>
         <A0_button bg={"transparent"}  border={true} content={"Log In"}/>
         <A0_button bg={"#A6E433"}  border={false} content={"Sign up"}/>
        </div>

      </div>
    </div>
  )
}

export default Landing