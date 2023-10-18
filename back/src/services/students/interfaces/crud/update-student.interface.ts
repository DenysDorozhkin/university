import { ICreateStudent } from './create-student.interface';

export interface IUpdateStudent extends Partial<ICreateStudent> {}
