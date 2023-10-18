import { ApiProperty } from '@nestjs/swagger';
import { IReturnLectorWithCoursesAndStudents } from '../../../../services/lectors/interfaces/other/return-lector-with-courses-and-students.interface';
import { CourseWithStudentsDto } from 'src/controllers/courses/dto/other/course-with-students.response.dto';

export class LectorWithCoursesAndStudentsDto
  implements IReturnLectorWithCoursesAndStudents
{
  @ApiProperty({ description: 'Lector id', nullable: false })
  id: string;

  @ApiProperty({ description: 'Lector created date', nullable: false })
  createdAt: Date;

  @ApiProperty({ description: 'Lector updated date', nullable: false })
  updatedAt: Date;

  @ApiProperty({ description: 'Lector name', nullable: true })
  name: string | null;

  @ApiProperty({ description: 'Lector email', nullable: false })
  email: string;

  @ApiProperty({ description: 'Array of lector courses', nullable: false })
  courses: CourseWithStudentsDto[];
}
