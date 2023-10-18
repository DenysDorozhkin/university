import { instance } from "../api/api.interceptor";
import { HttpMethodsEnum } from "../types/http-methods.enum";
import {
  IStudent,
  IStudentCreate,
  IStudentUpdate,
  IStudentWithCourses,
  IStudentWithGroupName,
} from "./student.interface";
import { Buffer } from "buffer";

export const StudentsService = {
  async getAll(): Promise<IStudent[]> {
    const response = await instance<void, { data: IStudent[] }>({
      url: `/students`,
      method: HttpMethodsEnum.GET,
    });

    return response.data;
  },

  async getStudentById(id: string): Promise<IStudent> {
    const response = await instance<void, { data: IStudent }>({
      url: `/students/${id}`,
      method: HttpMethodsEnum.GET,
    });

    return response.data;
  },

  async getAllWithGroupName(): Promise<IStudentWithGroupName[]> {
    const response = await instance<void, { data: IStudentWithGroupName[] }>({
      url: `/students/with-group-name/all`,
      method: HttpMethodsEnum.GET,
    });

    return response.data;
  },

  async getAllWithCourses(): Promise<IStudentWithCourses[]> {
    const response = await instance<void, { data: IStudentWithCourses[] }>({
      url: `/students/with-courses/all`,
      method: HttpMethodsEnum.GET,
    });

    return response.data;
  },

  async createStudent(data: IStudentCreate) {
    const response = await instance<IStudentCreate, { data: IStudent }>({
      url: `/students`,
      method: HttpMethodsEnum.POST,
      data,
    });

    return response.data;
  },

  async getAllWithGroupNameWithNameFilter(
    name: string
  ): Promise<IStudentWithGroupName[]> {
    const response = await instance<void, { data: IStudentWithGroupName[] }>({
      url: `/students/with-group-name/all?name=${name}`,
      method: HttpMethodsEnum.GET,
    });

    return response.data;
  },

  async getAllWithCoursesWithNameFilter(
    name: string
  ): Promise<IStudentWithCourses[]> {
    const response = await instance<void, { data: IStudentWithCourses[] }>({
      url: `/students/with-courses/all?name=${name}`,
      method: HttpMethodsEnum.GET,
    });

    return response.data;
  },

  async getStudentAvatarByAvatarId(id: string) {
    const response = await instance({
      url: `/students/avatar/${id}`,
      method: HttpMethodsEnum.GET,
      responseType: "arraybuffer",
    });

    return Buffer.from(response.data, "binary").toString("base64");
  },

  async updateStudentAvatarById(id: string, formData: FormData) {
    const response = await instance({
      url: `/students/avatar/${id}`,
      method: HttpMethodsEnum.POST,
      data: formData,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  },

  async updateStudent(studentId: string, data: IStudentUpdate) {
    const response = await instance<IStudentUpdate, { data: IStudent }>({
      url: `/students/${studentId}`,
      method: HttpMethodsEnum.PATCH,
      data,
    });

    return response.data;
  },
};
