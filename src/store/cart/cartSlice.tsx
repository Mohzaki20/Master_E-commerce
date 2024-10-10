import { createSlice } from "@reduxjs/toolkit";
import { TProduct } from "@customTypes/product.types";
import { TLoading } from "@customTypes/shared.types";
import actGetProductsByItems from "./act/actGetProductsByItems";

interface ICart {
  items: { [key: string]: number };
  productsFullInfo: TProduct[];
  loading: TLoading;
  error: null | string;
}
const initialState: ICart = {
  items: {},
  productsFullInfo: [],
  loading: "idle",
  error: null,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const id = action.payload;
      if (state.items[id]) {
        state.items[id]++;
      } else {
        state.items[id] = 1;
      }
    },
    cartItemChangeQuantity: (state, action) => {
      state.items[action.payload.id] = action.payload.quantity;
    },
    removeItem: (state, action) => {
      delete state.items[action.payload];
      state.productsFullInfo = state.productsFullInfo.filter(
        (item) => item.id !== action.payload
      );
    },
    cartItemsCleanUp: (state) => {
      state.productsFullInfo = [];
    },
   
  },
  extraReducers: (builder) => {
    builder.addCase(actGetProductsByItems.pending, (state) => {
      state.loading = "pending";
      state.error = null;
    });
    builder.addCase(actGetProductsByItems.fulfilled, (state, action) => {
      state.loading = "succeeded";
      state.productsFullInfo = action.payload;
    });
    builder.addCase(actGetProductsByItems.rejected, (state, action) => {
      if (action.payload && typeof action.payload === "string") {
        state.error = action.payload;
      }
    });
  },
});

export const {
  addToCart,
  cartItemChangeQuantity,
  removeItem,
  cartItemsCleanUp,
} = cartSlice.actions;
export default cartSlice.reducer;
