import { ApiProperty } from '@nestjs/swagger';
import { CourseDto } from 'src/controllers/courses/dto/crud/course.response.dto';
import { IReturnStudentWithCourses } from 'src/services/students/interfaces/other/return-student-with-courses.interface';

export class StudentWithCoursesDto implements IReturnStudentWithCourses {
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

  @ApiProperty({ description: 'Group id', nullable: true })
  groupId: string | null;

  @ApiProperty({
    description: 'Array of student courses',
    nullable: false,
  })
  courses: CourseDto[];
}
