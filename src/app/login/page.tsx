'use client'
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../redux/store";
import { logIn } from "../redux/features/authSlice";
import axios from "axios";
import { useRouter } from "next/navigation";
import { fetchUserData } from "../redux/features/ayncThunkApi";

const LoginPage = () => {
  const router=useRouter()
  const API_URL='http://localhost:5000/api/users/login'

  const dispatch=useDispatch<AppDispatch>()
    useEffect(()=>{
      // dispatch(fetchproductData())

    },[dispatch])
  const [formData,setFormData]=useState({
    email:'',
    psd:'',
  })
  const {email,psd}=formData
  const onChange=(e:any)=>{
    setFormData((prevData)=>({
      ...prevData,
      [e.target.name]:e.target.value,
    }))}

    const onSubmit=async (e:any)=>{
      
      e.preventDefault()
      try {
        
        const userData={email,psd}
        const response=await axios.post(API_URL,userData)
        const data1=response.data;
        // localStorage.setItem("user",JSON.stringify(data1))
        // dispatch(logIn(userData))
        dispatch(fetchUserData({ email}))
        localStorage.setItem("user",email)

        router.push('/')
          console.log("suu")
        } catch (error) {
        console.log(error)
      }
      
    }
  return (
    <div className="p-1 h-[calc(100vh-2rem)] md:h-[calc(100vh-0rem)] flex items-center justify-center">
   <div className=" h-full shadow-2xl rounded-md flex flex-col md:flex-row md:h-[80%] md:w-full lg:w-[70%] 2xl:w-1/2">
        {/* IMAGE CONTAINER */}
        <div className="relative h-1/3 w-full md:h-full md:w-1/2 xl:bg-[url('/bg.jpeg')]">
          {/* <Image src="/bg.jpeg" alt="" fill className="object-cover"/> */}
        </div>
        {/* FORM CONTAINER */}
        <div className="px-10 flex flex-col gap-8 md:w-1/2">
          <h1 className="font-bold text-xl xl:text-sm italic text-slate-600">Welcome</h1>
          <p>Log into your account or create a new one using social buttons</p>
          
          <form onSubmit={onSubmit} className="">
            
            <div className="mb-2">
              <label className="block text-slate-700 text-sm font-bold mb-2" >
                Email
              </label>
              <input value={email} name='email' onChange={onChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-slate-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Username"/>
            </div>
            <div className="mb-2">
              <label className="block text-slate-700 text-sm font-bold mb-2" >
                Password
              </label>
              <input value={psd} name='psd' onChange={onChange} type='password'  className="shadow appearance-none border border-slate-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="psd"  placeholder="******************"/>
              <p className="text-slate-500 text-xs italic">{}</p>
            </div>
            
            <div className="flex items-center justify-between">
              <button type='submit' className="bg-green-600 hover:bg-green-700 text-white font-bold px-8 py-1 rounded-sm focus:outline-none focus:shadow-outline" >
                Submit
              </button>
              <a className="inline-block align-baseline font-bold text-sm text-slate-500 hover:text-slate-800" href="#">
                Forgot psd?
              </a>
            </div>
          </form>
          <p className="text-sm">
              do you have already accout?<Link className="underline" href="/register"> Register</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage
