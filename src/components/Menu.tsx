"use client"
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'

const links= [
    {id:1,title:"Homepage",url:'/'},
    {id:2,title:"Menu",url:'/menu'},
    {id:3,title:"Working hours",url:'/'},
    {id:4,title:"Contact us",url:'/'}
]
const Menu = () => {
    const [open,setOpen]=useState(false);
    const user=false
  return (
    <div>
       {!open? <i className="fa fa-list" aria-hidden="true" onClick={()=>setOpen(true)}></i> : 
         <i className="fa fa-times text-3xl text-red-500" aria-hidden="true"  onClick={()=>setOpen(false)}></i>

        }
    {open&&<div className='bg-primary text-slate-200 absolute left-0 top-23 h-[calc(100vh-6rem)] flex flex-col w-full gap-8 items-center  z-10justify-center text-3xl'>
        {links.map((item)=><Link href={item.url} key={item.id} onClick={()=>setOpen(false)}>{item.title}</Link>)}
          {!user?<Link href='/login'onClick={()=>setOpen(false)}>Login</Link>:
          <Link href='/order'onClick={()=>setOpen(false)}>Order</Link>}
          <Link href='/cart'onClick={()=>setOpen(false)}>
          <i className="fa fa-shopping-cart text-slate-800"> Cart  {3}</i>

          </Link>

    </div>}
    <div>

    </div>
    </div>
  )
}

export default Menu