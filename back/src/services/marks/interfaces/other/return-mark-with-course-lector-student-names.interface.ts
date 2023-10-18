import { IReturnBasicEntity } from 'src/application/interfaces/return-basic-entity.interface';

export interface IReturnMarkWithCourseLectorStudentNames
  extends IReturnBasicEntity {
  mark: number;
  courseName: string;
  studentName: string;
  lectorName: string;
}
