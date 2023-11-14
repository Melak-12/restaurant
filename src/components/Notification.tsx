"use client"
import React, { useState } from 'react'

const Notification = () => {
  const [showNotification,setShowNotification]=useState(true);

  if(!showNotification){
    return '';
  }
  return (
    <div className='bg-green-800 flex items-center '>
    <div className='text-slate-300 text-sm  md:text-base cursor-pointer flex-grow text-center justify-center'>
       Free delivery for all orders over 200 birr. Order now!
    </div>
    <i className="fa fa-times text-3xl text-red-500 pr-2" aria-hidden="true" onClick={()=>setShowNotification(false)}></i>
 </div>
 
 
  )
}

export default Notification