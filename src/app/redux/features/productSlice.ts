import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchProductData, Product } from "./ayncThunkApi";

interface ProductState {
  products: Product[];
}

interface InitialState {
  productValue: ProductState;
}

const initialState: InitialState = {
  productValue: {
    products: [],
  },
};

export const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchProductData.fulfilled, (state, action: PayloadAction<Product[]>) => {
      state.productValue.products = action.payload;
    });
  },
});
export default productSlice.reducer;
