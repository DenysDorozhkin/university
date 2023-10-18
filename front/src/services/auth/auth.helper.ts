import { IAuthResponse } from "./auth.interface";

export const saveAccessTokenToStorage = (data: IAuthResponse) => {
  localStorage.setItem("access-token", data.accessToken);
};

export const getAccessTokenFromStorage = (): IAuthResponse | null => {
  const accessToken = localStorage.getItem("access-token");

  if (accessToken) {
    return { accessToken };
  } else {
    return null;
  }
};

export const removeAccessTokenFromStorage = (): void => {
  if (localStorage.getItem("access-token"))
    localStorage.removeItem("access-token");
};
