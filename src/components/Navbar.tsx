import React from 'react'
import Menu from './Menu'
import Link from 'next/link'
import Image from 'next/image';

const Navbar = () => {
  const user=false;
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
        <Menu/>
      </div>
      {/* left menus */}
      <div className="hidden md:flex gap-4 justify-end">
      <i className="fa fa-phone-square rounded-lg gap-5 p-2 bg-slate-600 md:absolute top-3 right-2 lg:static" aria-hidden="true">+2519612</i>

          {!user?<Link href="/login" className='border-2 border-green-700 rounded-md pr-1'><i className="fa fa-sign-in p-2" aria-hidden="true"></i>
            login</Link>:
          <Link href="/orders">Orders</Link>}
          <Link href="/cart">
          Cart
           <i className="fa fa-shopping-cart font-bold text-lg p-2" aria-hidden="true"> </i>
          </Link>

     </div>
    </div>

  )
}

export default Navbar
