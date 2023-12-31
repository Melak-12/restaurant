"use client";

import { RootState, useAppSelector } from "@/app/redux/store";
import axios from "axios";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

type Inputs = {
  name: string;
  img:string,
  desc: string;
  price: number;
  catagory: string;
};

type Option = {
  name: string;
  additionalPrice: number;
};

const UpdateProduct = (id:any) => {
  const user = useAppSelector((state) => state.user.userValue.username);
 
    const products = useAppSelector((state: RootState) => state.products.productValue.products);
    const params=useParams();
    id= params.id
    const [inputs, setInputs] = useState<any>({
        name: "",
        img:"",
        desc: "",
        price: null,
        catagory: "",
    });
    
      useEffect(() => {
        const foundProduct = products.find((item) => item._id === id);
        console.log("found product",foundProduct)
        if (foundProduct) {
          setInputs({
            name: foundProduct.name,
            img: foundProduct.img,
            desc: foundProduct.desc,
            price: foundProduct.price,
            catagory: foundProduct.catagory,
          });
        }
      }, [id, products]);

      const router=useRouter();
      if(!user){
       router.push('/login')
       }
    const [option, setOption] = useState<Option>({
        name: "",
        additionalPrice: 0,
    });
    const [options, setOptions] = useState<Option[]>([]);


    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setInputs((prev:any) => {
        return { ...prev, [e.target.name]: e.target.value };
        });
    };
    const changeOption = (e: React.ChangeEvent<HTMLInputElement>) => {
        setOption((prev) => {
        return { ...prev, [e.target.name]: e.target.value };
        });
    };


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const parts = inputs.img.split('\\');
      const filename = parts[parts.length - 1];

      const data2=    {
            ...inputs,img:`${filename}`,
            options,
          }
      
      axios.put(`https://backendresturant.vercel.app/api/foods/${id}`, data2).then(response => {

        console.log('Data updation send  sent:', response.data);
        router.push('/')
      })
      .catch(error => {
        console.error('Error sending data:', error);
      });
      
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="p-8  pt-14 mt-16 pb-11 mb-3  lg:px-20 xl:px-40 h-[calc(100vh-2rem)] md:h-[calc(100vh-2rem)] flex items-center  justify-center text-slate-500">
      <form onSubmit={handleSubmit} className="flex flex-wrap gap-6">
        <h1 className="text-4xl mb-2 text-slate-600 font-bold">
          Update Product
        </h1>
        <div className="w-full flex flex-col gap-2 ">
          <label
            className="text-sm cursor-pointer flex gap-4 items-center"
            htmlFor="file"
          >
            <Image src={inputs.img} alt="" width={30} height={20} />
            <span>Upload Image</span>
          </label>
          <input
            type="file"
            onChange={handleChange}
            id="file"
            name="img"
            className="hidden" placeholder="image"
            defaultValue={inputs.img}
          />
          {/* {console.log("inputs",inputs)} */}
        </div>
        <div className="w-2/3 flex flex-col gap-2 ">
          <label className="text-lg text-slate-700">name</label>
          <input
            className="ring-2 ring-slate-300 p-4 rounded-sm placeholder:text-slate-400 outline-none"
            type="text"
            placeholder="Pizza"
            name="name"
            onChange={handleChange}
            defaultValue={inputs.name}
          />
        </div>
        <div className="w-full flex flex-col gap-2">
          <label className="text-lg text-slate-700">Description</label>
          <textarea
            rows={3}
            className="ring-2 ring-slate-200 p-4 rounded-sm placeholder:text-slate-400 outline-none"
            placeholder="A timeless favorite with a twist, showcasing a thin crust topped with sweet tomatoes, fresh basil and creamy mozzarella."
            name="desc"
            onChange={handleChange}
            defaultValue={inputs.desc}
          />
        </div>
        <div className="w-full flex flex-col gap-2 ">
          <label className="text-lg text-slate-700">Price</label>
          <input
            className="ring-2 ring-slate-200 p-4 rounded-sm placeholder:text-slate-400 outline-none"
            type="number"
            placeholder="29"
            name="price"
            onChange={handleChange}
            defaultValue={inputs.price}
          />
        </div>
        <div className="w-full flex flex-col gap-2 ">
          <label className="text-lg text-slate-700">Category</label>
          <input
            className="ring-2 ring-slate-200 p-4 rounded-sm placeholder:text-slate-400 outline-none"
            type="text"
            placeholder="catagory"
            name="catagory"
            onChange={handleChange}
            defaultValue={inputs.catagory}
          />
        </div>
        <div className="w-full flex flex-col gap-2">
          <label className="text-lg text-slate-700">Options</label>
          <div className="flex">
            <input
              className="ring-2 ring-slate-200 p-4 rounded-sm placeholder:text-slate-400 outline-none"
              type="text"
              placeholder="name"
              name="name"
              onChange={changeOption}
            />
            <input
              className="ring-2 ring-slate-200 p-4 rounded-sm placeholder:text-slate-400 outline-none"
              type="number"
              placeholder="Additional Price"
              name="additionalPrice"
              onChange={changeOption}
            />
            <button
              className="bg-slate-500 p-2 text-white"
              onClick={() => setOptions((prev) => [...prev, option])}
            >
              Add Option
            </button>
          </div>
          <div className="flex flex-wrap gap-4 mt-2">
            {options.map((opt) => (
              <div
                key={opt.name}
                className="p-2  rounded-md cursor-pointer bg-gray-200 text-gray-400"
                onClick={() =>
                  setOptions((prev) =>
                    prev.filter((item) => item.name !== opt.name)
                  )
                }
              >
                <span>{opt.name}</span>
                <span className="text-xs"> (+ ${opt.additionalPrice})</span>
              </div>
            ))}
          </div>
        </div>
        <button
          type="submit"
          className="bg-green-600 p-4 text-white w-48 rounded-md relative h-14 flex items-center justify-center"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default UpdateProduct;