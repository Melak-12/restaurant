import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { fetchUserData } from "./ayncThunkApi";
export interface UserData {
  name: string;
  cart: string[];
  orders: string[];
  email: string;
}
type InitialState = {
  userValue: AuthState;
};
type AuthState = {
  isAuth: Boolean;
  email: String;
  username: String;
  isAdmin: Boolean;
  cart:string[],
  orders:string[],
};
const initialState = {
  userValue: {
    isAuth: false,
    email:"",
    username: "",
    isAdmin: false,
    cart:[],
    orders:[]
  } as AuthState,
} as InitialState;
export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logOut: (state) => {
      localStorage.clear();
      console.log("log out")
      return initialState;
    },
    logIn: (state, action: PayloadAction<{ email: string; psd: string }>) => {

      const { email, psd } = action.payload;
      
      return {
        userValue: {
          isAdmin: email==="melakabebeee@gmail.com"?true:false,
          isAuth: true,
          email:email,
          username: email,
          cart:[],
          orders:[]
        },
      };
    },
    register: (state, action: PayloadAction<{ name:String, email: string; psd: string }>) => {
      const { name,email, psd } = action.payload;
      return {
        userValue: {
          isAdmin: false,
          isAuth: true,
          email:email,
          username: name,
          cart:[],
          orders:[]
        },
      };
    },
  },
  extraReducers(builder) {
    
    builder.addCase(fetchUserData.fulfilled, (state, action: PayloadAction<UserData>) => {
      const userData:any = action.payload; 
      console.log("user data builder",userData)
      // localStorage.setItem("userData",userData)
      state.userValue = {
        isAuth: true,
        email:userData.email,
        username: userData.name,
        isAdmin: userData.email=="melakabebeee@gmail.com"?true:false,
        cart:userData.cart,
        orders:userData.orders,
      };
    });
  },
  
});
export const { logIn, logOut ,register} = authSlice.actions;
export default authSlice.reducer;
