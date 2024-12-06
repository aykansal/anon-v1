import React from 'react'

const UserPrompt = (msg:string) => {
  return (
               <div className='w-full flex mb-5 justify-end gap-5 items-start '>    

               <div className='mt-2 w-[80%] py-5 px-3 rounded-lg rounded-tr-none bg-[#E2E8F0] '>
                   <p>{msg}</p>
               </div>
               <div className='w-10 h-10 rounded-full bg-gradient-to-r from-pink-500 to-purple-500'></div>
             </div>
  )
}

export default UserPrompt