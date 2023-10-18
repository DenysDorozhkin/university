import { IStudentAvatar } from 'src/services/students/interfaces/other/student-avatar.interface';

export class StudentAvatarDto implements IStudentAvatar {
  path: string;

  filename: string;

  mimetype: string;
}
