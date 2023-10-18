import { IReturnCourse } from 'src/services/courses/interfaces/crud/return-course.interface';
import { IReturnStudent } from '../crud/return-student.interface';

export interface IReturnStudentWithCourses extends IReturnStudent {
  courses: IReturnCourse[];
}
