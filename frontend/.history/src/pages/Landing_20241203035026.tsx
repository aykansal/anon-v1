import React from 'react'
import svg from "../assets/images/logo.svg"

const Landing = () => {
  // going through whole revamping shit 

  // not going to be responsive though 

  // still will be responsive soon enough 

  // lessgoo
  return (

    <div className='w-full h-screen bg-black py-8 '>
      {/* this is the navbar section  */}
      
      <div className='w-[60%] flex h-[9%] rounded-full border-white/30 border-[1px] mx-auto '>

        {/* this is the logo section  */}

        <div>
          <img src={svg} alt="main logo" />
        </div>

      </div>
    </div>
  )
}

export default Landing