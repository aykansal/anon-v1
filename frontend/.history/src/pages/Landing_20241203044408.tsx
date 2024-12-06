import React from 'react'
import svg from "../assets/images/logo.svg"
import A0_button from '../components/A0_button'

const Landing = () => {
  // going through whole revamping shit 

  // not going to be responsive though 

  // still will be responsive soon enough 

  // lessgoo
  return (

    <div className='w-full bg-black py-8 f5'>
      {/* this is the first section  */}

<div className='w-full h-screen  text-white f5'>
      {/* this is the navbar section  */}
      
      <div className='w-[60%] px-4 justify-between text-white flex items-center h-[9%] rounded-full border-white/30 border-[1px] mx-auto '>

        {/* this is the logo section  */}

        <div>
          <img className='h-11' src={svg} alt="main logo" />
        </div>

        {/* this is the nav links section  */}

        <nav className='flex gap-6 ml-10 '>
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
              <div className='w-full h-[86%] pt-[90px] '>
                {/* this is to the container for the main text  */}
                <div className='w-full flex flex-col items-center'>
                  {/* this is the gradient text box  */}

                  <div className=' w-[17%] h-9 bg-gradient-to-r flex items-center justify-center from-purple-400 tracking-wide  to-pink-400 text-neutral-950 font-semibold rounded-full'>
                    <h1>✨$7.5M seeds round raised</h1>
                  </div>

                  {/* this is the main text area  */}
                  
                  <div className='text-center mt-3 tracking-tighter leading-none text-8xl'>
                    <h1>Impactful desing,</h1>
                    <h1>Created effortlessly</h1>
                  </div>

                  {/* this is the main para of the first section */}

                  <div className='text-center opacity-60 mt-5'>
                    <p>Design tool shouldn't slow you down, Layer combine powerful</p>
                    <p>features with an intutive interface that keeps you in your creative flow</p>
                  </div>

                  {/* this is the search box area */}

                  <div className='w-full flex justify-center mt-5'>
                    <div className='w-[40%] h-14 border-[1px] border-white/30 rounded-full'>
                      <input className='outline-none' type="text" name="" id="" />
                    </div>
                  </div>


                </div>
              </div>
      </div>


    </div>
  )
}

export default Landing