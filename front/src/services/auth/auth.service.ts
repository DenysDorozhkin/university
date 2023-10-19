import axios from "axios";
import {
  IAuthResponse,
  IForgotPasswordRequest,
  IForgotPasswordResponse,
  ILogoutResponse,
  IResetPasswordRequest,
} from "./auth.interface";
import {
  removeAccessTokenFromStorage,
  saveAccessTokenToStorage,
} from "./auth.helper";
import { IAuthRequest } from "./auth.interface";
import { instance } from "../api/api.interceptor";
import { HttpMethodsEnum } from "../types/http-methods.enum";
import { AuthRoutesEnum } from "../types/routes.enum";

export const AuthService = {
  async main(type: "sign-in" | "sign-up", data: IAuthRequest): Promise<void> {
    const response = await instance<IAuthResponse>({
      url: `/auth/${type}`,
      method: HttpMethodsEnum.POST,
      data,
      withCredentials: true,
    });

    if (response.data.accessToken) {
      saveAccessTokenToStorage(response.data);
    }
  },

  async getNewTokens() {
    const response = await axios.get<IAuthResponse>(
      process.env.REACT_APP_API_URL + `/api/v1${AuthRoutesEnum.REFRESH}`,
      {
        withCredentials: true,
      }
    );

    if (response.data.accessToken) saveAccessTokenToStorage(response.data);
  },

  async forgotPassword(data: IForgotPasswordRequest): Promise<boolean> {
    const response = await axios.post<
      IForgotPasswordRequest,
      { data: IForgotPasswordResponse }
    >(
      process.env.REACT_APP_API_URL +
        `/api/v1${AuthRoutesEnum.FORGOT_PASSWORD}`,
      data
    );

    if (response.data.message === "Success") return true;
    return false;
  },

  async resetPassword(data: IResetPasswordRequest): Promise<boolean> {
    const response = await axios.post<
      IResetPasswordRequest,
      { data: IForgotPasswordResponse }
    >(
      process.env.REACT_APP_API_URL + `/api/v1${AuthRoutesEnum.RESET_PASSWORD}`,
      data
    );

    if (response.data.message === "Success") return true;
    return false;
  },

  async logout(): Promise<boolean> {
    const response = await axios.get<ILogoutResponse>(
      process.env.REACT_APP_API_URL + `/api/v1${AuthRoutesEnum.LOGOUT}`,
      {
        withCredentials: true,
      }
    );

    if (response.data.message === "Success") {
      removeAccessTokenFromStorage();
      return true;
    }
    return false;
  },
};
