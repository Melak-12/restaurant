"use client"
import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Product, fetchMenuData, fetchProductData } from "@/app/redux/features/ayncThunkApi";
import { AppDispatch, useAppSelector } from "../redux/store";
import { useDispatch } from "react-redux";


const Profile = () => {
    const dispatch=useDispatch<AppDispatch>();
     useEffect(()=>{
      dispatch(fetchProductData())
      dispatch(fetchMenuData())
  
    },[dispatch])
  const products :Product[]= useAppSelector((state) => state.products.productValue.products);
  console.warn("products are in admin  ",products)
  const [tabs, setTabs] = useState(0);

  const closeAdminAccount = async () => {
    try {
      if (confirm("Are you sure you want to close your Admin Account?")) {
        const res = await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/admin`);
        if (res.status === 200) {
        //   push("/admin");
        //   toast.success("Admin Account Closed!");
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex px-10 min-h-[calc(100vh_-_433px)] lg:flex-row flex-row lg:mb-0 mb-10">
      <div className="lg:w-80 w-100 flex-shrink-0 lg:h-[100vh]   justify-center flex lg:flex-col border-l-2 border-r-4 shadow-2xl">
        <div className="relative flex flex-col items-center px-10 py-5  border-b-0">
          <Image
            src="/burger.png"
            alt=""
            width={100}
            height={100}
            className="rounded-full"
          />
          <b className="text-2xl mt-1">Admin</b>
        </div>
        <ul className="text-center font-semibold ">
          <li
            className={`border w-full p-3 cursor-pointer hover:bg-primary hover:text-white transition-all `}>
            <i className="fa fa-cutlery"></i>
            <button className="ml-1 ">Products</button>
          </li>
          <li
            className={`border w-full p-3 cursor-pointer hover:bg-primary hover:text-white transition-all `}>
            <i className="fa fa-motorcycle"></i>
            <button className="ml-1">Orders</button>
          </li>
          <li
            className={`border w-full p-3 cursor-pointer hover:bg-primary hover:text-white transition-all `}>
            <i className="fa fa-ellipsis-h"></i>
            <button className="ml-1">Menus</button>
          </li>
          <li
            className={`border w-full p-3 cursor-pointer hover:bg-primary hover:text-white transition-all `}>
            <i className="fa fa-user"></i>
            <button className="ml-1">users</button>
          </li>
          <li
            className={`border w-full p-3 cursor-pointer hover:bg-primary hover:text-white transition-all`}
            onClick={() => window.open("/", "_blank")}
          >
            <i className="fa fa-home"></i>
            <button className="ml-1">
              Go to the site <br /> 
            </button>
          </li>
          <li
            className={`border w-full p-3 cursor-pointer hover:bg-primary hover:text-white transition-all`}
            // onClick={() => push("/")}
          >
            <i className="fa fa-solid"></i>
            <button className="ml-1">
              Go to the site <br /> 
            </button>
          </li>
          <li
            className={`border w-full p-3 cursor-pointer hover:bg-primary hover:text-white transition-all ${
              tabs === 4 && "bg-primary text-white"
            }`}
            onClick={closeAdminAccount}
          >
            <i className="fa fa-sign-out"></i>
            <button className="ml-1">Exit</button>
          </li>
        </ul>
      </div>
      <div className="flex flex-col w-full h-[calc(100vh-2rem)] md:h-[calc(100vh-9rem)] text-slate-500 ">
      {
        products.map((item)=>(

      <div key={item._id}  className=" p-4  justify-center   lg:w-2/3 2xl:w-full mt-7 shadow-lg lg:px-20 xl:px-40">
        <div className="flex items-center  justify-between mb-4">
          <Image src={item.img} alt="" width={100} height={100} />
          <div className="">
            <h1 className="uppercase text-xl font-bold text-slate-600">{item.name}</h1>
            <span>Large</span>
          </div>
          <h2 className="font-bold text-slate-600">{item.price}</h2>
          <i className="fa fa-edit text-blue-600 cursor-pointer"></i>
          <i className="fa fa-trash text-red-600 cursor-pointer"></i> 
        </div>
      </div>
       
       ))
      }
      </div>
     
    </div>
  );
};



export default Profile;