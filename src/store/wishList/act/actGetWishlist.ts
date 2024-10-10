import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { TProduct } from "@customTypes/product.types";
import { axiosErrorHandler } from "@util/axiosErrorHandler";

type TResponse = TProduct[];

const actGetWishlist = createAsyncThunk(
  "wishlist/actGetWishlist",
  async (_, thunkAPI) => {
    const { rejectWithValue, fulfillWithValue, signal } = thunkAPI;
    try {
      const userWishlist = await axios.get<{ productId: number }[]>(
        "/wishlist?userId=1",
        {
          signal,
        }
      );
      if (!userWishlist.data.length) {
        return fulfillWithValue([]);
      }
      const concatenatedItemsId = userWishlist.data
        .map((el) => `id=${el.productId}`)
        .join("&");
      const response = await axios.get<TResponse>(
        `/products?${concatenatedItemsId}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(axiosErrorHandler(error));
    }
  }
);

export default actGetWishlist;
