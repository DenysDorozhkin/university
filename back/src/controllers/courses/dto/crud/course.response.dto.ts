import { ApiProperty } from '@nestjs/swagger';
import { IReturnCourse } from 'src/services/courses/interfaces/crud/return-course.interface';

export class CourseDto implements IReturnCourse {
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

  @ApiProperty({ description: 'Amount of course hours', nullable: false })
  hours: number;
}
