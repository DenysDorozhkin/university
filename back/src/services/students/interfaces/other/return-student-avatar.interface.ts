import { IReturnBasicEntity } from 'src/application/interfaces/return-basic-entity.interface';

export interface IReturnStudentAvatar extends IReturnBasicEntity {
  path: string;
  filename: string;
  mimetype: string;
}
