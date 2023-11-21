'use client'
import React from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch, useAppSelector } from '@/app/redux/store';
import { logOut } from '@/app/redux/features/authSlice';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const Navbar = () => {
  const router=useRouter()
  const dispatch = useDispatch<AppDispatch>();
  const username = useAppSelector((state) => state.user.userValue.username);
  // const username1 = localStorage.getItem('user');
  // let user = username; 

  // try {
  //   const parsedData = JSON.parse(username1 || ''); 
  //   user = parsedData.name?parsedData.name:username; 

  // } catch (error) {
  //   console.error('Error parsing user data from localStorage:', error);
  // }

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
      <div className="md:text-left flex-1">
        <Link href="/">
          {/* <Image src='/logo.png'alt='' width={50} height={50}/> */}
          <i>AngelFood</i>
      
        </Link>
      </div>
     <div className="hidden md:flex gap-4 flex-1">
      <Link href="/"className='uppercase text-xl'>Home</Link>
      <Link href="/menu"className='uppercase text-xl'>Menu</Link>
      <Link href="/contact"className='uppercase text-xl'>Contact</Link>
      <Link href="/Services"className='uppercase text-xl'>Services</Link>

     </div>
      <div className='md:hidden'>
        {/* <Menu/> */}
      </div>
      {/* left menus */}
      <div className="hidden md:flex gap-4 justify-end">
     {/* <i className="fa fa-phone-square rounded-lg gap-5 p-2 bg-slate-600 md:absolute top-3 right-2 lg:static" aria-hidden="true">{user}</i> */}

          {!username ?<><Link href="/login" className='border-2 border-green-700 rounded-md pr-1'><i className="fa fa-sign-in p-2" aria-hidden="true"></i>
            login</Link>
            <Link href="/register" className='border-2 border-green-700 rounded-md pr-1'><i className="fa fa-sign-user p-2" aria-hidden="true"></i>
            register</Link>
            </>:<>
            <Link href='/'className=''> <i className="fa fa-user  text-lg p-2" aria-hidden="true"> </i>{username?username:""}</Link>
          <Link href="/orders" className='p-1'>Orders</Link>
          <Link href="/cart">
             Cart
           <i className="fa fa-shopping-cart font-bold text-lg p-2" aria-hidden="true"> </i>
          </Link>
          <Link href="/" className='pl-1 bg-red-600 text-white rounded-md pr-1 shadow-md text-sm text-center' onClick={logOutUser}>
           LogOut
          <i className="fa fa-sign-out font-bold text-lg p-2" aria-hidden="true" > </i>
          </Link>
          </>}

     </div>
    </div>

  )
}

export default Navbar
