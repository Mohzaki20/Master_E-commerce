import { TProduct } from "@customTypes/product.types";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosErrorHandler } from "@util/axiosErrorHandler";
import axios from "axios";

type TResponse = TProduct[];

const actGetProductsCatPrefix = createAsyncThunk(
  "products/actGetCategories",
  async (prefix: string, thunkAPI) => {
    const { rejectWithValue, signal } = thunkAPI;
    try {
      const response = await axios.get<TResponse>(
        `/products?cat_prefix=${prefix}`,
        {
          signal,
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(axiosErrorHandler(error));
    }
  }
);

export default actGetProductsCatPrefix;
