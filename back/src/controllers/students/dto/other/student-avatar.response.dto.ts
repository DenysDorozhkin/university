import { IReturnStudentAvatar } from 'src/services/students/interfaces/other/return-student-avatar.interface';

export class ReturnStudentAvatarDto implements IReturnStudentAvatar {
  id: string;

  createdAt: Date;

  updatedAt: Date;

  path: string;

  filename: string;

  mimetype: string;
}
