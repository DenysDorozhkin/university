import { instance } from "../api/api.interceptor";
import { HttpMethodsEnum } from "../types/http-methods.enum";
import { IGroup, IGroupCreate } from "./group.interface";

export const GroupsService = {
  async getAll(): Promise<IGroup[]> {
    const response = await instance<void, { data: IGroup[] }>({
      url: `/groups`,
      method: HttpMethodsEnum.GET,
    });

    return response.data;
  },

  async createGroup(data: IGroupCreate) {
    const response = await instance<IGroupCreate, { data: IGroup }>({
      url: `/groups`,
      method: HttpMethodsEnum.POST,
      data,
    });

    return response.data;
  },

  async updateGroup(groupId: string, data: IGroupCreate) {
    const response = await instance<IGroupCreate, { data: IGroup }>({
      url: `/groups/${groupId}`,
      method: HttpMethodsEnum.PATCH,
      data,
    });

    return response.data;
  },
};
