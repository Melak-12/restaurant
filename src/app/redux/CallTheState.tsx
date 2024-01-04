"use client"
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { AppDispatch, RootState, useAppSelector } from './store';
import { fetchMenuData, fetchProductData, fetchUserData } from './features/ayncThunkApi';

export default function CallTheState({
  children,
}: {
  children: React.ReactNode
}){
 const dispatch=useDispatch<AppDispatch>();
    useEffect(()=>{
      dispatch(fetchProductData())
      dispatch(fetchMenuData())
      const storedUserData:string = localStorage.getItem('user')||"";
      if (storedUserData) {
        // const parsedUserData = JSON.parse(storedUserData);
        console.warn("email in the localhost",storedUserData)
        dispatch(fetchUserData({email:storedUserData}))
      }

    },[dispatch])



  return (
    <div className="">

       {children}
    </div>
  );
};


