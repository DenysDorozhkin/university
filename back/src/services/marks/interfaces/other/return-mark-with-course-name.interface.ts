import { IReturnMark } from '../crud/return-mark.interface';

export interface IReturnMarkWithCourseName
  extends Omit<IReturnMark, 'courseId'> {
  courseName: string;
}
