import { createSlice } from "@reduxjs/toolkit";
import { IUserInitialState } from "./user.interface";
import { checkAuth, getUserMe, logout, signIn, signUp } from "./user.action";

const initialState: IUserInitialState = {
  user: undefined,
  isLoading: false,
  error: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUserMe.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUserMe.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(getUserMe.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
        state.user = undefined;
      })
      .addCase(signUp.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(signUp.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(signUp.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
        state.user = undefined;
      })
      .addCase(signIn.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(signIn.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(signIn.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
        state.user = undefined;
      })
      .addCase(logout.fulfilled, (state) => {
        state.isLoading = false;
        state.user = undefined;
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.user = action.payload;
      });
  },
});

export default userSlice.reducer;

export const userActions = userSlice.actions;
