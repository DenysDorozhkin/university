import { instance } from "../api/api.interceptor";
import { HttpMethodsEnum } from "../types/http-methods.enum";
import { ILector, ILectorCreate, ILectorUpdate } from "./lector.interface";

export const LectorsService = {
  async getAll(): Promise<ILector[]> {
    const response = await instance<void, { data: ILector[] }>({
      url: `/lectors`,
      method: HttpMethodsEnum.GET,
    });

    return response.data;
  },

  async createLector(data: ILectorCreate) {
    const response = await instance<ILectorCreate, { data: ILector }>({
      url: `/lectors`,
      method: HttpMethodsEnum.POST,
      data,
    });

    return response.data;
  },

  async updateLector(lectorId: string, data: ILectorUpdate) {
    const response = await instance<ILectorUpdate, { data: ILector }>({
      url: `/lectors/${lectorId}`,
      method: HttpMethodsEnum.PATCH,
      data,
    });

    return response.data;
  },
};
