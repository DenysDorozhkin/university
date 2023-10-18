import { IBasicEntityCorrect } from "../types/basic-entity.interface";

export interface IGroup extends IBasicEntityCorrect {
  name: string;
}

export interface IGroupCreate {
  name: string;
}
