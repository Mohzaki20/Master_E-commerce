import { createSlice } from "@reduxjs/toolkit";
import { TProduct } from "@customTypes/product";

interface ICart {
  items: { [key: number]: number };
  productFullInfo: TProduct[];
}
const initialState: ICart = {
  items: {},
  productFullInfo: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addCart: (state, action) => {
      const id = action.payload;
      if (state.items[id]) {
        state.items[id]++;
      } else {
        state.items[id] = 1;
      }
    },
  },
});

export const { addCart } = cartSlice.actions;
export default cartSlice.reducer;
