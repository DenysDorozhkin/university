import { IReturnBasicEntity } from 'src/application/interfaces/return-basic-entity.interface';

export interface IReturnCourse extends IReturnBasicEntity {
  name: string;
  description: string;
  hours: number;
}
