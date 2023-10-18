import { IsInt, IsNotEmpty, IsString, Max, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { ICreateCourse } from 'src/services/courses/interfaces/crud/create-course.interface';

export class CreateCourseDto implements ICreateCourse {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'Course name', nullable: false })
  name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'Course description', nullable: false })
  description: string;

  @IsInt()
  @Min(1, {
    message: 'Minimal number of course hours is 1.',
  })
  @Max(10000, {
    message: 'Maximal number of course hours is 10000.',
  })
  @IsNotEmpty()
  @ApiProperty({ description: 'Number of course hours', nullable: false })
  hours: number;
}
