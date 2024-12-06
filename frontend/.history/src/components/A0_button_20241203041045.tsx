import React from 'react'

interface val {
  bg:string
  border:boolean
  content: string
}

const A0_button:React.FC<val> = (bg , border , content) => {

         
               
  return (
               <button style={{backgroundColor:bg}} className={` w-[94px] h-12 ${border ? "border-[2px] border-white/50" : "text-neutral-950" }   rounded-full`}></button>
  )
}

export default A0_button