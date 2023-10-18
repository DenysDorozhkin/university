import { ApiProperty } from '@nestjs/swagger';
import { StudentDto } from 'src/controllers/students/dto/crud/student.response.dto';
import { IReturnCourseWithStudents } from 'src/services/courses/interfaces/other/return-course-with-students.interface';

export class CourseWithStudentsDto implements IReturnCourseWithStudents {
  @ApiProperty({ description: 'Course id', nullable: false })
  id: string;

  @ApiProperty({ description: 'Course created date', nullable: false })
  createdAt: Date;

  @ApiProperty({ description: 'Course updated date', nullable: false })
  updatedAt: Date;

  @ApiProperty({ description: 'Course name', nullable: false })
  name: string;

  @ApiProperty({ description: 'Course description', nullable: false })
  description: string;

  @ApiProperty({ description: 'Number of course hours', nullable: false })
  hours: number;

  @ApiProperty({ description: 'Array of course students', nullable: false })
  students: StudentDto[];
}
