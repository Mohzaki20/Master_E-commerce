import { createSlice } from "@reduxjs/toolkit";
import { TLoading } from "@customTypes/shared.types";
import actAuthRegister from "./act/actAuthRegister";
import { isString } from "@customTypes/guards";
import actAuthLogin from "@store/auth/act/actAuthLogin";
interface IAuthState {
  loading: TLoading;
  error: null | string;
  accessToken: string | null;
  user: {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
  } | null;
}

const initialState: IAuthState = {
  loading: "idle",
  error: null,
  accessToken: null,
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    resetUI: (state) => {
      state.loading = "idle";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(actAuthRegister.pending, (state) => {
      state.loading = "pending";
      state.error = null;
    });
    builder.addCase(actAuthRegister.fulfilled, (state) => {
      state.loading = "succeeded";
    });
    builder.addCase(actAuthRegister.rejected, (state, action) => {
      if (isString(action.payload)) {
        state.error = action.payload;
      }
    });
    builder.addCase(actAuthLogin.pending, (state) => {
      state.loading = "pending";
      state.error = null;
    });
    builder.addCase(actAuthLogin.fulfilled, (state, action) => {
      state.accessToken = action.payload.accessToken;
      state.loading = "succeeded";
    });
    builder.addCase(actAuthLogin.rejected, (state, action) => {
      state.loading = "failed";

      if (isString(action.payload)) {
        state.error = action.payload;
      }
    });
  },
});
export { actAuthRegister, actAuthLogin };
export const { resetUI } = authSlice.actions;
export default authSlice.reducer;
