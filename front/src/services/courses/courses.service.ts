import { instance } from "../api/api.interceptor";
import { HttpMethodsEnum } from "../types/http-methods.enum";
import {
  IAddStudentToCourse,
  ICourse,
  ICourseCreate,
  ICourseUpdate,
  ICourseWithMessage,
} from "./course.interface";

export const CoursesService = {
  async getAll(): Promise<ICourse[]> {
    const response = await instance<void, { data: ICourse[] }>({
      url: `/courses`,
      method: HttpMethodsEnum.GET,
    });

    return response.data;
  },

  async createCourse(data: ICourseCreate) {
    const response = await instance<ICourseCreate, { data: ICourse }>({
      url: `/courses`,
      method: HttpMethodsEnum.POST,
      data,
    });

    return response.data;
  },

  async addStudentToCourse(
    courseId: string,
    data: IAddStudentToCourse
  ): Promise<ICourseWithMessage> {
    const response = await instance<IAddStudentToCourse, ICourseWithMessage>({
      url: `/courses/student/${courseId}`,
      method: HttpMethodsEnum.PATCH,
      data,
    });

    return response;
  },

  async updateCourse(courseId: string, data: ICourseUpdate) {
    const response = await instance<ICourseUpdate, { data: ICourse }>({
      url: `/courses/${courseId}`,
      method: HttpMethodsEnum.PATCH,
      data,
    });

    return response.data;
  },
};
