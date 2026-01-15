import React from 'react'
import CardLayout from '../Layouts/CardLayout'
import Newp1 from '../../../Assets/Cards/Newp1.png'
import Newp2 from '../../../Assets/Cards/Newp2.png'
import Newp3 from '../../../Assets/Cards/Newp3.png'
import Newp4 from '../../../Assets/Cards/Newp4.png'

const NewProducts = ({Images=[]}) => {
  console.log(Images)
  if (!Array.isArray(Images)||Images.length < 4) return null;

  const [first, second, third, fourth] = Images;
  return (
   <CardLayout type='Featured' title='New Arrivals' showarrow={true}>
       <div className='grid w-full h-full grid-cols-2  gap-3 '>
        <div className='w-full h-full bg-black flex flex-col relative p-9'>
        <div className='w-full h-full md:p-10'>
            <img src={first.img?.[0]?.url} alt="" className='w-full h-full object-contain'/>
        </div>
        <div className='absolute bottom-0 left-3 flex flex-col md:gap-3 gap-1.5 text-white '>
               <h3 className='md:text-3xl  text-sm font-bold'>{first.title}</h3>
               <p className='md:text-xl text-xs flex flex-wrap'>{first.paragraph}</p>
               <button className='underline lg:text-sm  text-xs font-bold text-left '>Shop Now</button>
        </div>
       
        </div>
        <div className='w-full h-full flex  flex-col gap-5 '>
         <div className='w-full  h-1/2 flex bg-black   relative items-center  ' >
               <div className='absolute lg:w-1/2  w-full left-3 flex flex-col md:gap-3 gap-1.5 text-white p-5'>
               <h3 className='md:text-3xl text-sm font-bold'>{second.title}</h3>
               <p className='md:text-xl text-xs flex flex-wrap '>{second.paragraph}</p>
               <button className='underline md:text-sm text-xs font-bold text-left '>Shop Now</button>
        </div>
        
            <img src={second.img?.[0]?.url} alt="" className='h-full object-contain'/>
        
        </div>
        <div className='w-full h-1/2 flex md:gap-10 gap-3'>
             <div className='w-1/2 h-full bg-black relative '>
              <div className='w-full h-full lg:p-10 '>
            <img src={third.img?.[0]?.url} alt="" className='w-full h-full object-contain'/>
        </div>
        <div className='absolute bottom-0 left-3 lg:flex hidden flex-col gap-3 text-white '>
               <h3 className='md:text-3xl  font-bold'>{third.title}</h3>
               <p className='lg:text-xl flex flex-wrap '>{third.paragraph}</p>
               <button className='underline md:text-sm  font-bold text-left '>Shop Now</button>
        </div>
       
             </div>
             <div className='w-1/2 h-full bg-black relative'>
              <div className='w-full h-full lg:p-10 ' >
            <img src={fourth.img?.[0]?.url} alt="" className='w-full h-full object-contain'/>
        </div>
        <div className='absolute bottom-0 left-3 lg:flex hidden flex-col gap-3 text-white '>
               <h3 className='text-3xl font-bold'>{fourth.title}</h3>
               <p className='text-xl flex flex-wrap'>{fourth.paragraph}</p>
               <button className='underline text-sm font-bold text-left '>Shop Now</button>
        </div>
             </div>
        </div>
         </div>
       
       </div>
   </CardLayout>
  )
}

export default NewProducts
