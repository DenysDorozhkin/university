import { IReturnBasicEntity } from 'src/application/interfaces/return-basic-entity.interface';

export interface IReturnPost extends IReturnBasicEntity {
  title: string;
  description: string;
}
