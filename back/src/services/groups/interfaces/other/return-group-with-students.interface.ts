import { IReturnStudent } from 'src/services/students/interfaces/crud/return-student.interface';
import { IReturnGroup } from '../crud/return-group.interface';

export interface IReturnGroupWithStudents extends IReturnGroup {
  students: IReturnStudent[];
}
