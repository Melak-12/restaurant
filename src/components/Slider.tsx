"use client"
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

const data=[
  {
    id:1,
    title:'always fresh and always  hot food ',
    image:'/p10.png',
  },
  { 
    id:1,
    title:'we deliver your order wherever you are in addis ababa ',
    image:'/p2.png',
 },
 {

    id:1,
    title:'the best piza to share with your family and friends  ',
    image:'/burger.png',
}
]

const Slider = () => {
  const [currentSlide,setCurrentSlide]=useState(0);

 useEffect(()=>{
  const interval=setInterval(()=>setCurrentSlide((prev=>prev===data.length-1?0:prev+1)),5000)
 return ()=>clearInterval(interval);
 },[])

  return (
    <div className="flex flex-col   h-[calc(100vh-6rem)] md:h-[calc(80vh-9rem)] lg:flex-row p-7 bg-[url('/bg.jpeg')]">
      <div className="h-1/2 flex items-center justify-center flex-col gap-8 font-bold text-slate-600 lg:h-full lg:w-1/2 ">
        <h3 className='text-3xl md:p-10 text-center uppercase p-4 md:text-6xl xl:text-5xl'>{data[currentSlide].title}</h3>
          <Link href='/orders'>
                  <button className='bg-green-500 text-slate-200 py-4 px-8 '>Order Now</button>
          </Link>
      </div>
      <div className="w-full h-1/2 relative lg:h-full  lg:w-1/2 ">
        <Image src={data[currentSlide].image}alt='image '  fill className='object-cover xl:object-contain'/>
      </div>
    </div>
  )
}

export default Slider