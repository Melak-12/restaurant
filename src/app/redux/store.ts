"use client";
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/authSlice";
import menuReducer from "./features/menuSlice";
import productReducer from "./features/productSlice";
import { TypedUseSelectorHook, useSelector } from "react-redux";
export const store = configureStore({
  reducer: {
    user: authReducer,
    menus: menuReducer,
    products: productReducer,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
