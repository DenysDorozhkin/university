import { IReturnCourse } from '../crud/return-course.interface';
import { IReturnStudent } from 'src/services/students/interfaces/crud/return-student.interface';

export interface IReturnCourseWithStudents extends IReturnCourse {
  students: IReturnStudent[];
}
