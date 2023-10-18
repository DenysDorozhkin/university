import { ApiProperty } from '@nestjs/swagger';
import { IReturnMarkWithCourseName } from '../../../../services/marks/interfaces/other/return-mark-with-course-name.interface';

export class MarkWithCourseNameDto implements IReturnMarkWithCourseName {
  @ApiProperty({ description: 'Mark id', nullable: false })
  id: string;

  @ApiProperty({ description: 'Mark created date', nullable: false })
  createdAt: Date;

  @ApiProperty({ description: 'Mark updated date', nullable: false })
  updatedAt: Date;

  @ApiProperty({ description: 'Mark value', nullable: false })
  mark: number;

  @ApiProperty({ description: 'Course name', nullable: false })
  courseName: string;

  @ApiProperty({ description: 'Student id', nullable: false })
  studentId: string;

  @ApiProperty({ description: 'Lector id', nullable: false })
  lectorId: string;
}
