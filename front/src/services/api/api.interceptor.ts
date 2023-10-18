import axios from "axios";
import { errorCatch, getContentType } from "./api.helper";
import {
  getAccessTokenFromStorage,
  removeAccessTokenFromStorage,
} from "../auth/auth.helper";
import { AuthService } from "../auth/auth.service";

const API_URL = process.env.REACT_APP_API_URL;

export const instance = axios.create({
  baseURL: `${API_URL}/api/v1`,
  headers: getContentType(),
});

instance.interceptors.request.use((config) => {
  const accessTokenObject = getAccessTokenFromStorage();

  if (config.headers && accessTokenObject?.accessToken) {
    config.headers.authorization = `Bearer ${accessTokenObject.accessToken}`;
  }

  return config;
});

instance.interceptors.response.use(
  (config) => config,
  async (error) => {
    const originalRequest = error.config;

    if (
      (error.response.status === 401 ||
        errorCatch(error) === "Jwt expired" ||
        errorCatch(error) === "Jwt must be provided") &&
      error.config &&
      !error.config._isRetry
    ) {
      originalRequest._isRetry = true;

      try {
        await AuthService.getNewTokens();

        return instance.request(originalRequest);
      } catch (error) {
        if (errorCatch(error) === "Jwt expired") removeAccessTokenFromStorage();
      }
    }

    throw error;
  }
);
