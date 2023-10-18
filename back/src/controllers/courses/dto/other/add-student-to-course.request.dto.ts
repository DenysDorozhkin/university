import { IsNotEmpty, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { IAddStudentToCourse } from 'src/services/courses/interfaces/other/add-student-to-course.interface';

export class AddStudentToCourseDto implements IAddStudentToCourse {
  @IsNotEmpty()
  @IsUUID()
  @ApiProperty({ description: 'Student id', nullable: false })
  studentId: string;
}
