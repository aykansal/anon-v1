import React from 'react'

interface val {
  bg:string
  border:boolean
}

const A0_button:React.FC<val> = (bg , border) => {

         
               
  return (
               <button style={{backgroundColor:bg}} className={` w-[94px] h-12 ${border ? "border-[2px] border-white/50" : "text-black" }   rounded-full`}>Log in</button>
  )
}

export default A0_button