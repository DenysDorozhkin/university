import { IReturnBasicEntity } from 'src/application/interfaces/return-basic-entity.interface';

export interface IReturnStudent extends IReturnBasicEntity {
  name: string;
  surname: string;
  email: string;
  age: number;
  imagePath: string | null;
  groupId: string | null;
}
