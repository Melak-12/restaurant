"use client"
import Link from "next/link";
import React, { useEffect } from "react";
import { Menu, fetchMenuData, fetchUserData } from "../redux/features/ayncThunkApi";
import { AppDispatch, useAppSelector } from "../redux/store";
import { useDispatch } from "react-redux";

const MenuPage = () => {
  const menus :Menu[]= useAppSelector((state) => state.menus.menuValue.menus);

  return (
    <div className="p-4 lg:px-20 xl:px-40 h-[calc(120vh-1rem)] md:h-[calc(100vh-9rem)] flex flex-col md:flex-row   items-center">
      {menus.map((category) => (
        <Link
          href={`/menu/${category.collectionName}`}
          key={category._id}
          className="w-full h-1/3 bg-cover p-8 md:h-1/2 m-7 rounded-lg hover:animate-pulse"
          style={{ backgroundImage: `url(${category.img})` }}
        >
          <div className={`text-slate-500 w-1/2`}>
            <h1 className="uppercase font-bold text-3xl text-slate-200 ">{category.collectionName}</h1>
            <p className="text-sm my-8 text-white">{category.desc}</p>
            <button className={`hidden 2xl:block bg-slate-600 text-white py-2 px-4 rounded-md`}>Explore</button>
          </div>
        </Link>
      ))}
    </div>
  );
};  

export default MenuPage;
