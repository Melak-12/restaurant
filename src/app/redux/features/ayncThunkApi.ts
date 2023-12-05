import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { UserData } from "./authSlice";

export interface Product {
  _id: string;
  name: string;
  desc: string;
  img: string;
  price: number;
  catagory:string;
  options: {
    size: string;
    additionalPrice: number;
    _id: string;
  }[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}
export interface Menu {
  _id: string;
  collectionName: string;
  desc: string;
  img: string;
  foodsName: {
    name: string;
    _id: string;
  }[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}


export const fetchProductData = createAsyncThunk<Product[]>("productData/fetch", async () => {
  console.log("fetch data ");
  try {
    const response = await axios.get("https://food-backend-9tkt.onrender.com/api/foods/");
    const data = response.data;
    const products: Product[] = data.map((item: any) => ({
      _id: item._id,
      name: item.name,
      desc: item.desc,
      img: item.img,
      price: item.price,
      catagory:item.catagory,
      options: item.options,
      createdAt: item.createdAt,
      updatedAt: item.updatedAt,
      __v: item.__v,
    }));

    return products;
  } catch (error) {
    throw error;
  }
});



export const fetchMenuData = createAsyncThunk<Menu[]>("menuData/fetch", async () => {
  console.log("fetch data ");
  try {
    const response = await axios.get("https://food-backend-9tkt.onrender.com/api/menus/");
    const data = response.data;
    const menus: Menu[] = data.map((item: any) => ({

      _id: item._id,
      collectionName: item.collectionName,
      desc: item.desc,
      img: item.img,
      foodsName: item.foodsName,
      createdAt: item.createdAt,
      updatedAt: item.updatedAt,
      __v: item.__v,
    }));
    return menus
  } catch (error) {
    throw error;
  }
});
export const fetchUserData = createAsyncThunk<UserData,{email:string}>("userData/fetch", async ({email}) => {
  try {
    const response = await axios.get(`https://food-backend-9tkt.onrender.com/api/users/getme?email=${email}`);
    const userData = response.data;
    console.log("fetch data from thunk ",userData);


    return userData;
  } catch (error) {
    throw error;
  }
});
