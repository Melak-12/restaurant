"use client"
import { logOut } from '@/app/redux/features/authSlice'
import { AppDispatch, useAppSelector } from '@/app/redux/store'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'

const links= [
    {id:1,title:"Homepage",url:'/'},
    {id:2,title:"Menu",url:'/menu'},
    // {id:3,title:"Working hours",url:'/'},
    {id:4,title:"Contact us",url:'/'},
    {id:5,title:"Orders",url:'/orders'}
]
const Menu = () => {
    const [open,setOpen]=useState(false);
    const username = useAppSelector((state) => state.user.userValue.username);
    const cartLength = useAppSelector((state) => state.user.userValue.cart?.length)||0;
    const orderLength = useAppSelector((state) => state.user.userValue.orders?.length)||0;
    const router=useRouter()
    const dispatch = useDispatch<AppDispatch>();
    const logOutUser = async (e:any) => {
      setOpen(false)
      e.preventDefault();
      try  {
        // username="";
        localStorage.clear();
        
        dispatch(logOut())
       && router.push('/login')
      } catch (error) {
        console.log('Cannot log out', error);
      }
    };
    const user=false
  return (
    <div>
       {!open? <i className="fa fa-list mr-15" aria-hidden="true" onClick={()=>setOpen(true)}></i> : 
         <i className="fa fa-times text-3xl text-red-500" aria-hidden="true"  onClick={()=>setOpen(false)}></i>

        }
     {open&&
     <div className='bg-slate-700  pt-4 mt-4 text-slate-400 absolute left-0 top-23 md:h-[calc(100vh-6rem)] h-[calc(65vh-4rem)] flex flex-col w-full md:gap-8 gap-2 items-left px-3  z-10 justify-left md:text-3xl font-bold text-xl'>
        {links.map((item)=>
        <Link href={item.url} key={item.id} onClick={()=>setOpen(false)}>
          { item.id===1&&   <i className="fa fa-home p-3">  </i>}
          { item.id===2&&   <i className="fa fa-cutlery p-3">  </i>}
          { item.id===3&&   <i className="fa fa-clock-o p-3">  </i>}
          { item.id===4&&   <i className="fa fa-phone p-3">  </i>}
          { item.id===5&&   <i className="fa fa-motorcycle p-3">  </i>}
        {item.title}
        
        </Link>)}
          <div className=" md:flex gap-3 justify-end">

          {!username ?<><Link href="/login" onClick={()=>setOpen(false)} className='border-2 border-green-700 rounded-md pr-1'><i className="fa fa-sign-in p-2" aria-hidden="true"></i>
            login</Link>
            <Link href="/register"onClick={()=>setOpen(false)} className='border-2 border-green-700 rounded-md pr-1'><i className="fa fa-sign-user p-2" aria-hidden="true"></i>
            register</Link>
            </>:<>
            <Link href='/'className=''> <i className="fa fa-user  text-lg p-2" aria-hidden="true"> </i>{username?username:""}</Link><br />
            {/* <Link href="/orders"onClick={()=>setOpen(false)} className="bg-slate-600 text-slate-200 p-2  rounded-xl mx-3 relative">
            Orders
            <i className="fa fa-motorcycle font-bold text-lg pl-2 pt-2" aria-hidden="true"></i>
            <span className="absolute top-1 right-0 transform translate-x-1/2 -translate-y-1/2 inline-flex items-center justify-center w-4 h-4 text-xs font-semibold text-white bg-red-500 rounded-full">
              {orderLength?orderLength:0}
            </span>
          </Link>
          
          <Link href="/cart" className="bg-slate-600 text-slate-200 p-2  rounded-xl px-2 relative" onClick={()=>setOpen(false)}>
            Cart
            <i className="fa fa-shopping-cart font-bold text-lg pl-2 pt-2" aria-hidden="true"></i>
            <span className="absolute top-1 right-0 transform translate-x-1/2 -translate-y-1/2 inline-flex items-center justify-center w-4 h-4 text-xs font-semibold text-white bg-red-500 rounded-full">
              {cartLength?cartLength:0}
            </span>
          </Link><br /> <br /> */}

          <Link href="/"onClick={logOutUser} className='pl-3 ring-2 ring-red-600 bg-slate-600 hover:bg-red-500 p-2  text-white rounded-md pr-2 shadow-md text-sm text-center'>
           LogOut
          <i className="fa fa-sign-out font-bold text-lg p-2" aria-hidden="true" > </i>
          </Link>
          </>}

     </div>

    </div>}
    <div>

    </div>
    </div>
  )
}

export default Menu