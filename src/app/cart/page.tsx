"use client"
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { AppDispatch, useAppSelector } from "../redux/store";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { fetchMenuData, fetchProductData, fetchUserData } from "../redux/features/ayncThunkApi";
import axios from "axios";

const CartPage = () => {
  const user = useAppSelector((state) => state.user.userValue.email);
  const cartIds = useAppSelector((state) => state.user.userValue.cart);
  const products = useAppSelector((state) => state.products.productValue.products);
  const [totalCost, setTotalCost] = useState<number>(0);
  const [isOpen, setIsOpen] = useState(false);

  const router=useRouter();
  const dispatch=useDispatch<AppDispatch>();
  useEffect(()=>{
    dispatch(fetchProductData())
    dispatch(fetchMenuData())
    const storedUserData:string = localStorage.getItem('user')||"";
    if (storedUserData) {
      console.log("email in the localhost",storedUserData)
      dispatch(fetchUserData({email:storedUserData}))
    }
 
   
  },[dispatch])
  
  const cartProducts = products.filter((product) =>
  cartIds.includes(product._id)
  );
  console.warn("cartProducts are",cartProducts)
  useEffect(() => {
    if (cartProducts && cartProducts.length > 0) {
      const total = cartProducts.reduce((acc, curr) => acc + curr.price, 0);
      setTotalCost(total);
    } else {
      setTotalCost(0);
    }
  }, [cartProducts]);
  const removeCart=async(id:any)=>{
  try {
    const res= await axios.put(`http://localhost:5000/api/users/removecart?email=${user}`,{cart:id})
    dispatch(fetchUserData({email:user.toString()}))
    console.warn("removed item from the cart ",res.data)
  } catch (error) {
    console.log(error)
  } 
  }



  const handleModal = () => {
    setIsOpen((prev)=>!prev)
    }
  const users = localStorage.getItem('user')||"";
  if ( !user&&users==null) {
    router.push('/login')
}
  

  return (
    <div className="h-[calc(100vh-6rem)] md:h-[calc(100vh-9rem)] flex flex-col text-slate-500 lg:flex-row w-[48vh] lg:w-full">
      <div className="h-1/2 p-4 bg-slate-50 flex flex-col  justify-center overflow-y-scroll lg:h-full lg:w-full 2xl:w-1/2 lg:px-10 xl:px-14">
        
       {cartProducts&& cartProducts.map((item)=>( 
       <div key={item._id} className="flex items-center justify-between mb-4 bg-slate-200 px-3 rounded-xl">
          <Image src={item.img} alt="" width={80} height={80} />
          <div className="">
            <h1 className="uppercase text-xl font-bold">{item.name}</h1>
            <span>Large</span>
          </div>
          <h2 className="font-bold text-yellow-600">${item.price}</h2>
          <h2 className="font-bold text-slate-600 ">- 1 + </h2>
          <span className="cursor-pointer text-red-600 text-lg" onClick={()=>removeCart(item._id)}>X</span>
        </div>
        ))}
        
      </div>
      <hr className="md:hidden "/>
      <div className="h-1/2 p-4 bg-slate-50 flex flex-col gap-4 justify-center lg:h-full lg:w-1/3 2xl:w-1/2 lg:px-20 xl:px-40 2xl:text-xl 2xl:gap-6">
        <div className="flex justify-between">
          <span className="">Subtotal ({cartIds.length})</span>
          <span className="">${totalCost.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span className="">Service Cost</span>
          <span className="">$0.00</span>
        </div>
        <div className="flex justify-between">
          <span className="">Delivery Cost</span>
          <span className="text-green-500">FREE!</span>
        </div>
        <hr className="my-2" />
        <div className="flex justify-between">
          <span className="">TOTAL(INCL. VAT)</span>
          <span className="font-bold">${totalCost.toFixed(2)}</span>
        </div>
        <button onClick={handleModal} className="bg-slate-500 text-white p-3 rounded-md w-2/3 self-end">
          CHECKOUT
        </button>
      </div>
      {isOpen && (
          <div className="fixed top-0 left-0 z-50 w-full h-full bg-opacity-100 flex items-center justify-center backdrop-brightness-75 backdrop-blur-none ">
            <div className="bg-white rounded-lg p-8">
              <h3 className="font-bold text-lg mb-4">Payment!</h3>
              <div className="flex justify-around lg:flex-row sm:flex-col ">
                <span className="bg-slate-300 m-3 p-4 rounded-md font-bold text-lg">Telebirr <br /><span className="text-slate-400 text-sm">+251961295261</span></span>
                <span className="bg-slate-300 m-3 p-4  rounded-md">CBE <br />10003283920</span>
                <span className="bg-slate-300 m-3 p-4 rounded-md">Abysisnia Bank <br />2376872</span>
              </div>
              <p className="py-4 text-green-600 text-sm">After finishing the payment You can see your items in your product</p>
              <i className="fa fa-info"> for more information </i><br /><i className="fa fa-phone"> 0961295261</i>
              <div className="flex justify-around">
              <button
                  onClick={handleModal}
                  className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  Pay Bill
                </button>
                <button
                  onClick={handleModal}
                  className="bg-slate-500 hover:bg-slate-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
    </div>
  );
};

export default CartPage;
