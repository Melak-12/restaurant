import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchMenuData, Menu } from "./ayncThunkApi";

interface MenuState {
  menus: Menu[];
}

interface InitialState {
  menuValue: MenuState;
}

const initialState: InitialState = {
  menuValue: {
    menus: [],
  },
};

export const MenuSlice = createSlice({
  name: "menus",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchMenuData.fulfilled, (state, action: PayloadAction<Menu[]>) => {
      state.menuValue.menus = action.payload;
    });
  },
});
export default MenuSlice.reducer;
