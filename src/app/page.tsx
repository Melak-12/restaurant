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
