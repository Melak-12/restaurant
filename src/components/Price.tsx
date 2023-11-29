"use client";

import { fetchUserData } from "@/app/redux/features/ayncThunkApi";
import { AppDispatch, useAppSelector } from "@/app/redux/store";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

type Props = {
  price: number;
  id: string;
  options?: { size: string; additionalPrice: number }[];
};

const Price = ({ price, id, options }: Props) => {
  const user = useAppSelector((state) => state.user.userValue.email);

  const [total, setTotal] = useState(price);
  const [quantity, setQuantity] = useState(1);
  const [selected, setSelected] = useState(0);

  const dispatch=useDispatch<AppDispatch>();
  useEffect(() => {
    if (options && options.length > 0 && selected >= 0 && selected < options.length) {
      setTotal(quantity * (price + options[selected].additionalPrice));
    } else {
      setTotal(quantity * price);
    }
  }, [quantity, selected, options, price]);
  

  const addToCart=async()=>{
    try {
     
      const resss= await axios.put(`http://localhost:5000/api/users?email=${user}`,{cart:id})

      const storedUserData:string = localStorage.getItem('user')||"";
         if(storedUserData){  
         dispatch(fetchUserData({email:storedUserData}))
         }
      console.warn("suuuu",resss.data)
      
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-2xl font-bold text-yellow-600 mb-2">${total.toFixed(2)}</h2>
      <div className="flex gap-4 mb-2">
        {options?.map((option, index) => (
          <button
            key={option.size}
            className="min-w-[6rem] p-2 ring-1 ring-green-600 rounded-md"
            style={{
              background: selected === index ? "green" : "white",
              color: selected === index ? "white" : "green",
            }}
            onClick={() => setSelected(index)}
          >
            {option.size}
          </button>
        ))}
      </div>
      <div className="flex justify-between items-center mb-2 w-[40vh] md:w-full">
        <div className="flex justify-between w-full p-3 ring-1 ring-slate-500">
          <span className="text-sm">Item</span>
          <div className="flex gap-4 items-center">
            <button
              onClick={() => setQuantity((prev) => (prev > 1 ? prev - 1 : 1))}
            >
                    <i className="fa fa-caret-left text-lg pl-2" aria-hidden="true"></i>

            </button>
            <span>{quantity}</span>
            <button
              onClick={() => setQuantity((prev) => (prev < 9 ? prev + 1 : 9))}
            >
            <i className="fa fa-caret-right" aria-hidden="true"></i>
            </button>
          </div>
        </div>
        <Link href={user?`/cart/`:`/login`}>
        {/* <Link href={`/cart/${id}`}> */}

        <button  className="uppercase md:w-56 w-[20vh] bg-slate-500 text-white p-3 ring-1 ring-slate-500" onClick={addToCart}>
          Add to Cart
        </button>
        </Link>
      </div>
    </div>
  );
};

export default Price;
