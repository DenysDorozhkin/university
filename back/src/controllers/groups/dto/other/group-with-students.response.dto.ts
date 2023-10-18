import { ApiProperty } from '@nestjs/swagger';
import { IReturnGroupWithStudents } from '../../../../services/groups/interfaces/other/return-group-with-students.interface';
import { StudentDto } from 'src/controllers/students/dto/crud/student.response.dto';

export class GroupWithStudentsDto implements IReturnGroupWithStudents {
  @ApiProperty({ description: 'Group id', nullable: false })
  id: string;

  @ApiProperty({ description: 'Group created date', nullable: false })
  createdAt: Date;

  @ApiProperty({ description: 'Group updated date', nullable: false })
  updatedAt: Date;

  @ApiProperty({ description: 'Group name', nullable: false })
  name: string;

  @ApiProperty({ description: 'Group students array', nullable: false })
  students: StudentDto[];
}
