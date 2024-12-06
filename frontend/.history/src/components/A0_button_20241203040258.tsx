import React from 'react'

const A0_button = (props:{bg:string , border:boolean}) => {

               const {bg , border} = props
               
  return (
               <button style={{backgroundColor:bg}} className={` w-[94px] h-12 ${border && "border-[2px] border-white/50" }   rounded-full`}>Log in</button>
  )
}

export default A0_button