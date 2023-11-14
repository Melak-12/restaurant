import { featuredProducts } from "@/data";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Featured = () => {
  return (
    <div className="w-screen overflow-x-scroll text-slate-500 ">
      <div className="w-max flex">
        {featuredProducts.map((item) => (
          <div
            key={item.id}
            className="w-screen group h-[60vh] flex flex-col items-center rounded-3xl bg-slate-200 p-6 justify-around m-4 mt-9 hover: hover:bg-slate-700 transition-all duration-300 md:w-[50vw] xl:w-[25vw] xl:h-[70vh]"
          >
            {/* IMAGE CONTAINER */}
            {item.img && (
              <div className="relative flex-1 w-full hover:rotate-[60deg]  transition-all duration-500"> 
                <Image src={item.img} alt="" fill className="object-contain round-lg" />
              </div>
            )}
            <div className=" flex-1 flex flex-col items-center justify-center text-center gap-4">
              <h1 className="text-xl font-bold uppercase xl:text-2xl 2xl:text-3xl pt-2">{item.title}</h1>
              <p className="p-2 2xl:p-5 group-hover:text-slate-400">{item.desc}</p>
              <span className="text-xl font-bold group-hover:text-yellow-600 text-slate-500">${item.price}</span>

              <Link href={`/product/4`}>
              <button className="bg-green-600 text-white p-2 rounded-md group-hover:animate-bounce">
                Add to Cart
              </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Featured;
