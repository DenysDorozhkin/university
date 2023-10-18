import { IBasicEntityCorrect } from "../types/basic-entity.interface";

export interface ILector extends IBasicEntityCorrect {
  name: string | null;
  email: string;
}

export interface ILectorCreate {
  email: string;
  name: string;
  password: string;
}

export interface ILectorUpdate extends Partial<ILectorCreate> {}
