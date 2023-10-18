import { IReturnBasicEntity } from 'src/application/interfaces/return-basic-entity.interface';

export interface IReturnLector extends IReturnBasicEntity {
  name: string | null;
  email: string;
}
