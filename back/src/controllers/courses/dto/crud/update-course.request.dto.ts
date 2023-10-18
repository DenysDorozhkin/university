import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator';
import { IUpdateCourse } from 'src/services/courses/interfaces/crud/update-course.interface';

export class UpdateCourseDto implements IUpdateCourse {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @ApiPropertyOptional({ description: 'Course name', nullable: false })
  name?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @ApiPropertyOptional({ description: 'Course name', nullable: false })
  description?: string;

  @IsOptional()
  @IsInt()
  @Min(1, {
    message: 'Minimal number of course hours is 1.',
  })
  @Max(10000, {
    message: 'Maximal number of course hours is 10000.',
  })
  @IsNotEmpty()
  @ApiPropertyOptional({ description: 'Course name', nullable: false })
  hours?: number;
}
