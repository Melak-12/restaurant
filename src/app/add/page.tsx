"use client";

import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { use, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, useAppSelector } from "../redux/store";
import { fetchProductData, fetchUserData } from "../redux/features/ayncThunkApi";

type Inputs = {
  name: string;
  img:string,
  desc: string;
  price: number;
  catagory: string;
};

type Option = {
  size: string;
  additionalPrice: number;
};

const AddPage = () => {
  const router = useRouter();
  const dispatch=useDispatch<AppDispatch>();
  const isAdmin = useAppSelector((state) => state.user.userValue.isAdmin);
  const user = useAppSelector((state) => state.user.userValue.email);
  const [pageVisible, setPageVisible] = useState(false);
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       if (typeof window !== 'undefined') {
  //         const user = localStorage.getItem('user');
  //         await dispatch(fetchUserData({ email: user || '' }));
  
  //         if (user !== 'melakabebeee@gmail.com') {
  //           router.push('/login');
  //         } else {
  //           setPageVisible(true);
  //         }
  //       }
  //     } catch (error) {
  //       console.error("Error fetching user data:", error);
  //       // router.push('/login');
  //     }
  //   };
  
  //   fetchData();
  // }, [router, dispatch,isAdmin]);
  

  const [inputs, setInputs] = useState<Inputs>({
    name: "",
    img:"",
    desc: "",
    price: 0,
    catagory: "",
  });

  const [option, setOption] = useState<Option>({
    size: "",
    additionalPrice: 0,
  });

  const [options, setOptions] = useState<Option[]>([]);


  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };
  const changeOption = (e: React.ChangeEvent<HTMLInputElement>) => {

    setOption((prev) => {
      return { ...prev, [e.target.name]:e.target.name=="additionalPrice"?parseFloat(e.target.value) :e.target.value };
    });
  };


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const parts = inputs.img.split('\\');
      const filename = parts[parts.length - 1];

      const data2=    {
            ...inputs,img:`/${filename}`,
            options,
          }
        

      console.warn("data to be send to db ",data2)
      axios.post('https://backendresturant.vercel.app/api/foods', data2).then(response => {
        router.push(`/product/${response.data.message._id}`);
        console.log('Data sent:', response.data);
        console.log("id",response.data.message._id)
        dispatch(fetchProductData())
      })
      .catch(error => {
        console.error('Error sending data:', error);
      });
      
    } catch (err) {
      console.log(err);
    }
  };

  if (user !== 'melakabebeee@gmail.com') {
              router.push('/login');
            } else {
              setPageVisible(true);
            }
            if (!pageVisible) {
              return null;
            }
  return (
    <div className="p-8  pt-14 mt-16 pb-11 mb-3  lg:px-20 xl:px-40 h-[calc(100vh-2rem)] md:h-[calc(100vh-2rem)] flex items-center  justify-center text-slate-500">
      {/* {user? */}
      <form onSubmit={handleSubmit} className="flex flex-wrap gap-6">
        <h1 className="text-4xl mb-2 text-slate-600 font-bold">
          Add New Product
        </h1>
        <div className="w-full flex flex-col gap-2 ">
          <label
            className="text-sm cursor-pointer flex gap-4 items-center"
            htmlFor="file"
          >
            <Image src="/burger.png" alt="" width={30} height={20} />
            <span>Upload Image</span>
          </label>
          <input
            type="file"
            onChange={handleChange}
            id="file"
            name="img"
            className="hidden" placeholder="image"
          
          />
        </div>
        <div className="w-2/3 flex flex-col gap-2 ">
          <label className="text-lg text-slate-700">name</label>
          <input
            className="ring-2 ring-slate-300 p-4 rounded-sm placeholder:text-slate-400 outline-none"
            type="text"
            placeholder="Pizza"
            name="name"
            onChange={handleChange}
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
          />
        </div>
        <div className="w-full flex flex-col gap-2">
          <label className="text-lg text-slate-700">Options</label>
          <div className="flex">
            <input
              className="ring-2 ring-slate-200 p-4 rounded-sm placeholder:text-slate-400 outline-none"
              type="text"
              placeholder="size"
              name="size"
              onChange={changeOption}
            />
            <input
              className="ring-2 ring-slate-200 p-4 rounded-sm placeholder:text-slate-400 outline-none"
              type="number"
              placeholder="Additional Price"
              name="additionalPrice"
              onChange={changeOption}
            />
            <button type="button"
              className="bg-slate-500 p-2 text-white"
              onClick={() => setOptions((prev) => [...prev, option])}
            >
              Add Option
            </button>
          </div>
          <div className="flex flex-wrap gap-4 mt-2">
            {options.map((opt) => (
              <div
                key={opt.size}
                className="p-2  rounded-md cursor-pointer bg-gray-200 text-gray-400"
                onClick={() =>
                  setOptions((prev) =>
                    prev.filter((item) => item.size !== opt.size)
                  )
                }
              >
                <span>{opt.size}</span>
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
{/*      : ""
 } */}
</div>
  );
};

export default AddPage;