import { IReturnStudent } from '../crud/return-student.interface';

export interface IReturnStudentWithGroupName
  extends Omit<IReturnStudent, 'groupId'> {
  groupName: string | null;
}
