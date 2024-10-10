import { createSlice } from "@reduxjs/toolkit";
import actGetCategories from "./act/actGetCategories";
import { TCategory } from "@customTypes/category.types";
import { TLoading } from "@customTypes/shared.types";

interface ICategoriesState {
  records: TCategory[];
  loading: TLoading;
  error: null | string;
}

const initialState: ICategoriesState = {
  records: [],
  loading: "idle",
  error: null,
};

const CategoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    cleanUpCategory: (state) => {
      state.records = [];
    },
  },
  extraReducers(builder) {
    builder.addCase(actGetCategories.pending, (state) => {
      state.loading = "pending";
      state.error = null;
    });
    builder.addCase(actGetCategories.fulfilled, (state, action) => {
      state.loading = "succeeded";
      state.records = action.payload;
    });
    builder.addCase(actGetCategories.rejected, (state, action) => {
      state.loading = "succeeded";
      if (action.payload && typeof action.payload === "string") {
        state.error = action.payload;
      }
    });
  },
});
export const { cleanUpCategory } = CategoriesSlice.actions;
export default CategoriesSlice.reducer;
