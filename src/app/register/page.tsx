import Image from "next/image";
import Link from "next/link";
import React from "react";

const LoginPage = () => {
  return (
    <div className="p-1 h-[calc(100vh-2rem)] md:h-[calc(100vh-0rem)] flex items-center justify-center">
      {/* BOX */}
      <div className=" h-full shadow-2xl rounded-md flex flex-col md:flex-row md:h-[80%] md:w-full lg:w-[70%] 2xl:w-1/2">
        {/* IMAGE CONTAINER */}
        <div className="relative h-1/3 w-full md:h-full md:w-1/2">
          <Image src="/bg.jpeg" alt="" fill className="object-cover"/>
        </div>
        {/* FORM CONTAINER */}
        <div className="px-10 flex flex-col gap-8 md:w-1/2">
          <h1 className="font-bold text-xl xl:text-sm italic text-slate-600">Welcome</h1>
          <p>Log into your account or create a new one using social buttons</p>
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
         
          <form className="">
            <div className="mb-2">
              <label className="block text-slate-700 text-sm font-bold mb-2" >
                Name
              </label>
              <input className="shadow appearance-none border rounded w-full py-2 px-3 text-slate-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Username"/>
            </div>
            <div className="mb-2">
              <label className="block text-slate-700 text-sm font-bold mb-2" >
                Email
              </label>
              <input className="shadow appearance-none border rounded w-full py-2 px-3 text-slate-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Username"/>
            </div>
            <div className="mb-2">
              <label className="block text-slate-700 text-sm font-bold mb-2" >
                Password
              </label>
              <input className="shadow appearance-none border border-slate-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="******************"/>
              <p className="text-slate-500 text-xs italic">{}</p>
            </div>
            <div className="mb-2">
              <label className="block text-slate-700 text-sm font-bold mb-2" >
                Confirm Password
              </label>
              <input className="shadow appearance-none border border-slate-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="******************"/>
              <p className="text-slate-500 text-xs italic">{}</p>
            </div>
            <div className="flex items-center justify-between">
              <button className="bg-green-600 hover:bg-green-700 text-white font-bold px-8 py-1 rounded-sm focus:outline-none focus:shadow-outline" type="button">
                Submit
              </button>
              <a className="inline-block align-baseline font-bold text-sm text-slate-500 hover:text-slate-800" href="#">
                Forgot Password?
              </a>
            </div>
          </form>
          <p className="text-sm">
              do you have already accout?<Link className="underline" href="/login"> Resgister</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
