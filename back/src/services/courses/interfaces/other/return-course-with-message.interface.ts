import { IReturnCourse } from '../crud/return-course.interface';

export interface IReturnCourseWithMessage {
  course: IReturnCourse;
  message: string;
}
