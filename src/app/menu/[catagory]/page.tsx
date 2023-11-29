"use client"
import Loading from "@/app/loading";
import { useAppSelector } from "@/app/redux/store";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const CategoryPage = (catagory:any) => {
  const products = useAppSelector((state) => state.products.productValue.products);

  const params = useParams();
   catagory = params.catagory; 

  const [loading, setLoading] = useState<boolean>(true);
  const [filteredProducts, setFilteredProducts] = useState<any[]>([]);

  useEffect(() => {
    if (catagory && products.length > 0) {
      const filtered = products.filter((product) => product.catagory === catagory);
      setFilteredProducts(filtered);
      setLoading(false);
    }
  }, [catagory, products]);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="flex flex-wrap text-slate-500 md:p-14 p-5 h-50 w-50">
      {filteredProducts.map((item: any) => (
        <Link
          className=" flex w-full h-[50vh] border-r-9 border-b-2 shadow-lg rounded-md sm:w-1/2 lg:w-1/4 lg:p-5 lg:m-4 m-6  flex-col justify-around group odd:bg-slate-100 "
          href={`/product/${item._id}`}
          key={item._id}
        >
          {item.img && (
            <div className="relative h-[80%]">
              <Image src={item.img || ""} alt="" fill className="object-fill" />
            </div>
          )}
          <div className="flex items-center justify-between font-bold">
            <h1 className="text-2xl uppercase p-2">{item.name}</h1>
            <h2 className="group-hover:hdidden text-xl text-yellow-600 group-hover:ml-7">${item.price}</h2> {/* Changed 'id' to 'price' */}
            <button className="hidden group-hover:block uppercase bg-green-500 animate-bounce text-white p-2 rounded-md">
              Add to Cart
            </button>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default CategoryPage;
