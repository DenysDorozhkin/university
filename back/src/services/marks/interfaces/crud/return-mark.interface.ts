import { IReturnBasicEntity } from 'src/application/interfaces/return-basic-entity.interface';

export interface IReturnMark extends IReturnBasicEntity {
  mark: number;
  lectorId: string;
  studentId: string;
  courseId: string;
}
