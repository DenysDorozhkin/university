import { instance } from "../api/api.interceptor";
import { HttpMethodsEnum } from "../types/http-methods.enum";
import { ILector } from "../lectors/lector.interface";

export const UsersService = {
  async me() {
    const response = await instance<ILector>({
      url: `/users/me`,
      method: HttpMethodsEnum.GET,
    });

    if (response.data) return response.data;
  },
};
