import { ApiProperty } from '@nestjs/swagger';
import { IReturnStudentWithGroupName } from '../../../../services/students/interfaces/other/return-student-with-group-name.interface';

export class StudentWithGroupNameDto implements IReturnStudentWithGroupName {
  @ApiProperty({ description: 'Student id', nullable: false })
  id: string;

  @ApiProperty({ description: 'Student created date', nullable: false })
  createdAt: Date;

  @ApiProperty({ description: 'Student updated date', nullable: false })
  updatedAt: Date;

  @ApiProperty({ description: 'Student name', nullable: false })
  name: string;

  @ApiProperty({ description: 'Student surname', nullable: false })
  surname: string;

  @ApiProperty({ description: 'Student email', nullable: false })
  email: string;

  @ApiProperty({ description: 'Student age', nullable: false })
  age: number;

  @ApiProperty({ description: 'Student image path', nullable: false })
  imagePath: string | null;

  @ApiProperty({ description: 'Group name', nullable: false })
  groupName: string | null;
}
