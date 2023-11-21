import { Product } from "@/app/redux/features/ayncThunkApi";
import { useAppSelector } from "@/app/redux/store";
import Image from "next/image";
import Link from "next/link";
import React, { useRef } from "react";

const Featured = () => {

  const products :Product[]= useAppSelector((state) => state.products.productValue.products);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (scrollOffset:any) => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollLeft += scrollOffset;
    }
  };

  return (
    <div className="w-screen overflow-x-scroll text-slate-500">
       <button
        className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-transparent border-none z-10"
        onClick={() => scroll(-100)}
      >
        <i className="fa fa-caret-left" aria-hidden="true"></i>
      </button>
      <i className="fa fa-caret-right" aria-hidden="true"></i>

      <div className="w-max flex">
        {products.map((item) => (
          <>
          {/* <Link></Link> */}
          <div
            key={item._id} 
            className="w-screen hover:w-[54vh] group h-[60vh] flex flex-col items-center rounded-3xl bg-slate-200 p-6 justify-around m-4 mt-9 hover: hover:bg-slate-700 transition-all duration-300 md:w-[50vw] xl:w-[25vw] xl:h-[65vh]"
          >
            {item.img && (
              <div className="relative flex-1 w-full hover:rotate-[60deg]  transition-all duration-500">
                <Image src={item.img} alt={item.name} fill  className="object-contain round-lg" />
              </div>
            )}
            <div className="flex-1 flex flex-col items-center justify-center text-center gap-4">
              <h1 className="text-xl font-bold uppercase xl:text-2xl 2xl:text-3xl pt-2 group-hover:text-slate-400">{item.name}</h1>
              <p className="p-2 2xl:p-5 group-hover:text-slate-400">{item.desc}</p>
              <span className="text-xl font-bold group-hover:text-yellow-600 text-slate-500">${item.price}</span>
              <Link href={`/product/${item._id}`}>
                <button className="bg-green-600 text-white p-2 rounded-md group-hover:animate-bounce">
                  Add to Cart
                </button>
              </Link>
            </div>
          </div>
          </>

        ))}
      </div>
      <i className="fa fa-caret-left" aria-hidden="true"></i>

    </div>
  );
};

export default Featured;
