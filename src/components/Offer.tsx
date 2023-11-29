import Image from "next/image";
import React from "react";
import CountDown from "./CountDown";

const Offer = () => {
  return (
    <div className="bg-slate-800 h-30 mt-16 flex flex-row md:flex-row md:justify-between md:bg-[url('/bg.png')] md:h-[50vh]">
      <div className="flex-1 flex flex-col justify-center items-center text-center gap-8 p-6">
        <h1 className="text-white text-lg font-bold xl:text-6xl  md:text-5xl">Delicious Burger</h1>
        <p className="text-white xl:text-xl text-sm">
          Progressively simplify effective e-toilers and process-centric methods
          
        </p>
        <p className="hidden md:block text-white">of empowerment. Quickly pontificate parallel.</p>
        <CountDown/>
        <button className="bg-green-500 text-white rounded-md py-3 px-6">Order Now</button>
      </div>
      {/* <div className="flex-1">

      <Image src="/p2.png" alt="" width={110} height={110} className="object-contain" />
      </div> */}
      <div className="flex-1 w-full relative md:h-full">
        <Image src="/p2.png" alt="" fill className="object-contain" />
      </div>

    </div>
  );
};

export default Offer;
