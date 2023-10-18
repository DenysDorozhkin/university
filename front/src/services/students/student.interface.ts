import { ICourse } from "../courses/course.interface";
import { IBasicEntity } from "../types/basic-entity.interface";

export interface IStudent extends IBasicEntity {
  email: string;
  name: string;
  surname: string;
  age: number;
  imagepath: string | null;
  groupId: string | null;
}

export interface IStudentWithGroupName extends Omit<IStudent, "groupId"> {
  groupName: string | null;
}

export interface IStudentWithCourses extends IStudent {
  courses: ICourse[];
}

export interface IStudentWithGroupNameAndCourses
  extends Omit<IStudent, "groupId"> {
  groupName: string | null;
  courses: ICourse[];
}

export interface IStudentCreate {
  email: string;
  name: string;
  surname: string;
  age: number;
}

export interface IStudentUpdate extends Partial<IStudent> {}
