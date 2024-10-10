import { createSlice } from "@reduxjs/toolkit";
import actGetProductsCatPrefix from "./act/actGetProductsCatPrefix";
import { TLoading } from "@customTypes/shared.types";
import { TProduct } from "@customTypes/product.types";

interface ICategoriesState {
  records: TProduct[];
  loading: TLoading;
  error: null | string;
}

const initialState: ICategoriesState = {
  records: [],
  loading: "idle",
  error: null,
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    productsCleanUp: (state) => {
      state.records = [];
    },
  },
  extraReducers(builder) {
    builder.addCase(actGetProductsCatPrefix.pending, (state) => {
      state.loading = "pending";
      state.error = null;
    });
    builder.addCase(actGetProductsCatPrefix.fulfilled, (state, action) => {
      state.loading = "succeeded";
      state.records = action.payload;
    });
    builder.addCase(actGetProductsCatPrefix.rejected, (state, action) => {
      state.loading = "succeeded";
      if (action.payload && typeof action.payload === "string") {
        state.error = action.payload;
      }
    });
  },
});
export const { productsCleanUp } = productsSlice.actions;
export default productsSlice.reducer;
