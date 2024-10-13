import { createSlice } from "@reduxjs/toolkit";
import actLikeToggle from "./act/actLikeToggle";
import actGetWishlist from "./act/actGetWishlist";
import { TLoading } from "@customTypes/shared.types";
import { TProduct } from "@customTypes/product.types";
import { isString } from "@customTypes/guards";

interface IWishList {
  itemId: number[];
  productsFullInfo: TProduct[];
  loading: TLoading;
  error: null | string;
}

const initialState: IWishList = {
  itemId: [],
  error: null,
  productsFullInfo: [],
  loading: "idle",
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    productsfullInfoCleanUp: (state) => {
      state.productsFullInfo = [];
    },
  },
  extraReducers(builder) {
    builder.addCase(actLikeToggle.pending, (state) => {
      state.error = null;
    });
    builder.addCase(actLikeToggle.fulfilled, (state, action) => {
      if (action.payload.type === "added") {
        state.itemId.push(action.payload.id);
      } else {
        state.itemId = state.itemId.filter((e) => e !== action.payload.id);
        state.productsFullInfo = state.productsFullInfo.filter(
          (e) => e.id !== action.payload.id
        );
      }
    });
    builder.addCase(actLikeToggle.rejected, (state, action) => {
      if (action.payload && typeof action.payload === "string") {
        state.error = action.payload;
      }
    });
    // get wishlist items
    builder.addCase(actGetWishlist.pending, (state) => {
      state.loading = "pending";
      state.error = null;
    });
    builder.addCase(actGetWishlist.fulfilled, (state, action) => {
      state.loading = "succeeded";
      state.productsFullInfo = action.payload;
    });
    builder.addCase(actGetWishlist.rejected, (state, action) => {
      state.loading = "failed";
      if (isString(action.payload)) {
        state.error = action.payload;
      }
    });
  },
});
export const { productsfullInfoCleanUp } = wishlistSlice.actions;
export default wishlistSlice.reducer;
