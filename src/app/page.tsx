"use client"
import Featured from "@/components/Featured";
import Offer from "@/components/Offer";
import Slider from "@/components/Slider";
import { Providers } from "./redux/provider";
import { useEffect } from "react";
import { AppDispatch } from "./redux/store";
import { fetchMenuData, fetchProductData, fetchUserData } from "./redux/features/ayncThunkApi";
import { useDispatch } from "react-redux";
import Test from "@/components/Test";

export default function Home() {
  const dispatch=useDispatch<AppDispatch>();
    useEffect(()=>{
      dispatch(fetchProductData())
      dispatch(fetchMenuData())
      const storedUserData:string = localStorage.getItem('user')||"";
      if (storedUserData) {
        // const parsedUserData = JSON.parse(storedUserData);
        console.log("email in the localhost",storedUserData)
        dispatch(fetchUserData({email:storedUserData}))
      }

    },[dispatch])
  return (
    <main>
      <Providers>
        <Slider/>
        <Featured/>
        <Offer/>
        {/* <Test/> */}
       </Providers>
     </main>
  )
}
