'use client'
import React from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch, useAppSelector } from '@/app/redux/store';
import { logOut } from '@/app/redux/features/authSlice';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Menu from './Menu';
import Image from 'next/image';

const Navbar = () => {
  const router=useRouter()
  const dispatch = useDispatch<AppDispatch>();
  const username = useAppSelector((state) => state.user.userValue.username);
  const cartLength = useAppSelector((state) => state.user.userValue.cart?.length)||0;
  const orderLength = useAppSelector((state) => state.user.userValue.orders?.length)||0;

  const logOutUser = async (e:any) => {
   
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

  return (
    <div className='h-18 text-slate-300 p-4 flex items-center justify-between border-b-2 shadow-lg rounded-b-2xl border-b-slate-400 bg-slate-700 '>
      <div className=" flex-1">
        <Link href="/" className=''>
          <Image src='/logo.png'alt='' width={50} height={50} className='md:hidden'/>
          <i className='md:justify-start flex justify-center -mt-10 md:m-0 text-center '>AngelFood</i>
      
        </Link>
      </div>
     <div className="hidden md:flex gap-4 flex-1">
      <Link href="/"className='uppercase text-xl'>Home</Link>
      <Link href="/menu"className='uppercase text-xl'>Menu</Link>
      <Link href="/contact"className='uppercase text-xl'>Contact</Link>
      <Link href="/Services"className='uppercase text-xl'>Services</Link>

     </div>
     {username&&
     <div className='md:hidden'> 
            <Link href="/orders" className=" text-slate-200   rounded-xl px-2 relative">
            
            <i className="fa fa-motorcycle font-bold text-lg pl-2 pt-2" aria-hidden="true"></i>
            <span className="absolute top-1 right-0 transform translate-x-1/2 -translate-y-1/2 inline-flex items-center justify-center w-4 h-4 text-xs font-semibold text-white bg-red-500 rounded-full">
              {orderLength?orderLength:0}
            </span>
          </Link>
         <Link href="/cart" className=" text-slate-200   md:block  rounded-xl px-2 relative">
            
            <i className="fa fa-shopping-cart font-bold text-lg pl-2 pt-2" aria-hidden="true"></i>
            <span className="absolute top-1 right-0 transform translate-x-1/2 -translate-y-1/2 inline-flex items-center justify-center w-4 h-4 text-xs font-semibold text-white bg-red-500 rounded-full">
              {cartLength?cartLength:0}
            </span>
          </Link>

         </div>}
      <div className="hidden md:flex gap-4 justify-end">

          {!username ?<><Link href="/login" className='border-2 border-green-700 rounded-md pr-1'><i className="fa fa-sign-in p-2" aria-hidden="true"></i>
            login</Link>
            <Link href="/register" className='border-2 border-green-700 rounded-md pr-1'><i className="fa fa-sign-user p-2" aria-hidden="true"></i>
            register</Link>
            </>:<>
            <Link href='/'className=''> <i className="fa fa-user  text-lg p-2" aria-hidden="true"> </i>{username?username:""}</Link>
            <Link href='/admin'className=''>{username==="melab"? <i className="fa fa-geers  text-lg p-2" aria-hidden="true">Admin </i>:""}</Link>
          
         {username!=="melab"&&<> 
            <Link href="/orders" className="bg-slate-600 text-slate-200  rounded-xl px-2 relative">
            Orders
            <i className="fa fa-motorcycle font-bold text-lg pl-2 pt-2" aria-hidden="true"></i>
            <span className="absolute top-1 right-0 transform translate-x-1/2 -translate-y-1/2 inline-flex items-center justify-center w-4 h-4 text-xs font-semibold text-white bg-red-500 rounded-full">
              {orderLength?orderLength:0}
            </span>
          </Link>
         <Link href="/cart" className="bg-slate-600 text-slate-200 rounded-xl px-2 relative">
            Cart
            <i className="fa fa-shopping-cart font-bold text-lg pl-2 pt-2" aria-hidden="true"></i>
            <span className="absolute top-1 right-0 transform translate-x-1/2 -translate-y-1/2 inline-flex items-center justify-center w-4 h-4 text-xs font-semibold text-white bg-red-500 rounded-full">
              {cartLength?cartLength:0}
            </span>
          </Link>

         </>}
         <Link href="/" className='pl-1 ring-2 ring-red-600 bg-slate-600 hover:bg-red-500  text-white rounded-md pr-1 shadow-md text-sm text-center' onClick={logOutUser}>
           LogOut
          <i className="fa fa-sign-out font-bold text-lg p-2" aria-hidden="true" > </i>
          </Link>
          </>}

     </div>
     <div className="md:hidden m-4">
      <Menu/>
     </div>
    </div>

  )
}

export default Navbar
