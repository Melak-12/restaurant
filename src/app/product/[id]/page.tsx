"use client"
import Price from "@/components/Price";
import axios from "axios";
import Image from "next/image";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const SingleProductPage = (id:any) => {

  const params = useParams();
  id=params.id
  const [product, setProduct] = useState<any>(null); 
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async (_id: any) => {
      try {
        const response = await axios.get(`http://localhost:5000/api/foods?_id=${_id}`);
        const {singleProduct}=response.data
        setProduct(singleProduct); 
        console.warn('response',response.data)
        setLoading(false)
        console.log("the id is ", _id)
        
      } catch (error) {
        console.error('Error fetching product:', error);
        setLoading(false)
      }
    };

    if (id) {
      fetchData(id); 
    }
  }, [id]);
  if (loading) {
    return <div>Loading...</div>; // Display a loading indicator
  }

  return (
    <div className="p-4 lg:px-10 xl:px-10 h-screen flex flex-col justify-around text-slate-500 md:flex-row md:gap-5 md:items-center">
      {product&& product.img && (
        <div className="relative w-1/2 h-1/2 md:h-[70%] lg:-ml-20">
          <Image
            src={product.img}
            alt=""
            className="object-contain"
            fill
          />
        </div>
      )}
      <div className="h-1/2 flex flex-col gap-4 md:h-[70%] md:justify-center md:gap-6 xl:gap-8 ">
        {product && (
          <>
            <h1 className="text-3xl font-bold uppercase xl:text-5xl">{product.name}</h1>
            <p>{product.desc}</p>
            <Price price={product.price} id={product._id} options={product.options} />
          </>
        )}
      </div>
    </div>
  );
};

export default SingleProductPage;
