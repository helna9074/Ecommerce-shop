import React from 'react'

const NotFound = () => {
  return (
     <div className="">
         <div className="flex gap-2  w-sm justify-center p-8">
        <p className="text-slate-400">Home /</p>
        <p className="text-black">About</p>
      </div >
    <div className="flex  w-full flex-col justify-center gap-4.5 items-center h-full">
        <div className='flex flex-col  gap-10 justify-between text-center h-full'>
<h1 className='lg:text-5xl text-2xl font-bold'>404 NOt Found</h1>
<p>Your visited page not found.you may go home page</p>

        </div>
        <button className='btn-secondary my-5 '>Back to home Page</button>
    </div>
    </div>
  )
}

export default NotFound
