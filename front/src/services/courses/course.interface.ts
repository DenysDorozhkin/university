import { IBasicEntityCorrect } from "../types/basic-entity.interface";

export interface ICourse extends IBasicEntityCorrect {
  name: string;
  description: string;
  hours: number;
}

export interface ICourseWithStudentsCount extends ICourse {
  studentsCount: number;
}

export interface ICourseCreate {
  name: string;
  description: string;
  hours: number;
}

export interface IAddStudentToCourse {
  studentId: string;
}

export interface ICourseWithMessage {
  course: ICourse;
  message: string;
}

export interface ICourseUpdate extends Partial<ICourseCreate> {}
