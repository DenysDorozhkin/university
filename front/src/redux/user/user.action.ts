import { createAsyncThunk } from "@reduxjs/toolkit";
import { UsersService } from "../../services/users/users.service";
import { IAuthRequest } from "../../services/auth/auth.interface";
import { AuthService } from "../../services/auth/auth.service";
import { ILector } from "../../services/lectors/lector.interface";
import { AxiosError } from "axios";

export const getUserMe = createAsyncThunk<ILector | undefined, void>(
  "users/me",
  async (_, thunkApi) => {
    try {
      const response = await UsersService.me();
      return response;
    } catch (error) {
      if (error instanceof AxiosError) {
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        if (message !== "Invalid credentials")
          return thunkApi.rejectWithValue(message);
      }

      throw error;
    }
  }
);

export const signUp = createAsyncThunk<ILector | undefined, IAuthRequest>(
  "auth/sign-up",
  async (data, thunkApi) => {
    try {
      await AuthService.main("sign-up", data);
      const response = await UsersService.me();
      return response;
    } catch (error) {
      if (error instanceof AxiosError) {
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        return thunkApi.rejectWithValue(message);
      }

      throw error;
    }
  }
);

export const signIn = createAsyncThunk<ILector | undefined, IAuthRequest>(
  "auth/sign-in",
  async (data, thunkApi) => {
    try {
      await AuthService.main("sign-in", data);
      const response = await UsersService.me();
      return response;
    } catch (error) {
      if (error instanceof AxiosError) {
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        return thunkApi.rejectWithValue(message);
      }

      throw error;
    }
  }
);

export const logout = createAsyncThunk("auth/logout", async (_, thunkApi) => {
  try {
    await AuthService.logout();
  } catch (error) {
    if (error instanceof AxiosError) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkApi.rejectWithValue(message);
    }

    throw error;
  }
});

export const checkAuth = createAsyncThunk<ILector | undefined>(
  "auth/check-auth",
  async (_, thunkApi) => {
    try {
      await AuthService.getNewTokens();
      const response = await UsersService.me();
      return response;
    } catch (error) {
      if (error instanceof AxiosError) {
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        if (error.response?.status === 401) {
          thunkApi.dispatch(logout());
        }
        return thunkApi.rejectWithValue(message);
      }

      throw error;
    }
  }
);
