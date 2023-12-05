"use client"
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../redux/store";
import axios from "axios";
import { register } from "../redux/features/authSlice";
import Loading from "../loading";

const RegisterPage = () => {
  const [error,setError]=useState('')
  const [loading,setLoading]=useState(false)
  const router=useRouter()
  const API_URL='https://food-backend-9tkt.onrender.com/api/users/'
  const [errors,setErrors]=useState('')
  const dispatch=useDispatch<AppDispatch>()
    useEffect(()=>{
      // dispatch(fetchproductData())

    },[dispatch])
  const [formData,setFormData]=useState({
    name:'',
    email:'',
    psd:'',
    psd2:''
  })
  const {name,email,psd,psd2}=formData
  const onChange=(e:any)=>{
    setFormData((prevData)=>({
      ...prevData,
      [e.target.name]:e.target.value,
    }))}

    const onSubmit=async (e:any)=>{
      e.preventDefault()
      if(email==''||name==""||psd===''){
       setError("Please fill all spaces ")
      }

      if(psd!==psd2){
        setErrors('passowrd does not mutch  ')
        return;
      }


      try {
        
        setLoading(true)
        const userData={name,email,psd}
        const response=await axios.post(API_URL,userData)
        const data1=response.data;
        localStorage.setItem("user",JSON.stringify(data1))
        dispatch(register(userData))
        localStorage.setItem("user",email)
        router.push('/')
        console.log("suu")
        } catch (error:any) {
        console.log(error||'')
        setErrors(error.response.data.msg)
      }
      finally{
        setLoading(false)
      }
      
    }

  return (
    <div className="p-1 h-[calc(100vh-2rem)] md:h-[calc(130vh-0rem)] flex items-center justify-center">
    {loading&&<Loading/>}
      <div className=" h-full shadow-2xl rounded-md flex flex-col md:flex-row md:h-[80%] md:w-full lg:w-[70%] 2xl:w-1/2">
        <div className="relative h-1/3 w-full md:h-full md:w-1/2 bg-[url('/bg.jpeg')]">
          {/* <Image src="/bg.jpeg" alt="" fill className="object-cover"/> */}
        </div>
        <div className="px-10 flex flex-col gap-8 md:w-1/2">
          <h1 className="font-bold text-xl xl:text-sm italic text-slate-600">Welcome</h1>
          <p className="text-sm text-slate-600">Log into your account or create a new one using social buttons</p>
          <button className="flex gap-4 p-1 ring-1 ring-orange-100 rounded-md">
            <Image
              src="/google.png"
              alt=""
              width={20}
              height={20}
              className="object-contain"
            />
            <span>Sign in with Google</span>
          </button>
         
          <form className=""onSubmit={onSubmit}>
          {errors&& <div className="text-red-500 text-xl flex text-center p-2 rounded-lg bg-red-100 justify-center">{errors}</div>}
            <div className="mb-2">
              <label className="block text-slate-700 text-sm font-bold mb-2" >
                Name
              </label>
              <input className="shadow appearance-none border rounded w-full py-2 px-3 text-slate-700 leading-tight focus:outline-none focus:shadow-outline" 
              id="username" name="name" type="text" placeholder="Username" onChange={onChange}/>
            </div>
            <div className="mb-2">
              <label className="block text-slate-700 text-sm font-bold mb-2" >
                Email
              </label>
              <input className="shadow appearance-none border rounded w-full py-2 px-3 text-slate-700 leading-tight focus:outline-none focus:shadow-outline" 
              onChange={onChange} id="username" name="email" type="text" placeholder="Email"/>
            </div>
            <div className="mb-2">
              <label className="block text-slate-700 text-sm font-bold mb-2" >
                Password
              </label>
              <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" 
              onChange={onChange} id="password"name="psd" type="password" placeholder="************"/>
              <p className="text-slate-500 text-xs italic">{}</p>
            </div>
            <div className="mb-2">
              <label className="block text-slate-700 text-sm font-bold mb-2" >
                Confirm Password
              </label>
              <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" 
              onChange={onChange} id="password" type="password" name="psd2" placeholder="************"/>
              <p className="text-slate-500 text-xs italic">{}</p>
            </div>
            <div className="flex items-center justify-between">
              <button className="bg-green-600 hover:bg-green-700 text-white font-bold px-8 py-1 rounded-sm focus:outline-none focus:shadow-outline" type="submit">
                Submit
              </button>
              <a className="inline-block align-baseline font-bold text-sm text-slate-500 hover:text-slate-800" href="#">
                Forgot Password?
              </a>
            </div>
          </form>
          <p className="text-sm text-slate-500">
              do you have already accout?<Link className="underline" href="/login"> Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
