import { IReturnLector } from '../crud/return-lector.interface';
import { IReturnCourseWithStudents } from 'src/services/courses/interfaces/other/return-course-with-students.interface';

export interface IReturnLectorWithCoursesAndStudents extends IReturnLector {
  courses: IReturnCourseWithStudents[];
}
