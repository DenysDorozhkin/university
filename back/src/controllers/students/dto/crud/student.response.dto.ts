import { ApiProperty } from '@nestjs/swagger';
import { IReturnStudent } from 'src/services/students/interfaces/crud/return-student.interface';

export class StudentDto implements IReturnStudent {
  @ApiProperty({ description: 'Student id', nullable: false })
  id: string;

  @ApiProperty({ description: 'Student created date', nullable: false })
  createdAt: Date;

  @ApiProperty({ description: 'Student updated date', nullable: false })
  updatedAt: Date;

  @ApiProperty({ description: 'Student email', nullable: false })
  email: string;

  @ApiProperty({ description: 'Student name', nullable: false })
  name: string;

  @ApiProperty({ description: 'Student surname', nullable: false })
  surname: string;

  @ApiProperty({ description: 'Student age', nullable: false })
  age: number;

  @ApiProperty({ description: 'Student image path', nullable: true })
  imagePath: string | null;

  @ApiProperty({ description: 'Group id', nullable: true })
  groupId: string | null;
}
