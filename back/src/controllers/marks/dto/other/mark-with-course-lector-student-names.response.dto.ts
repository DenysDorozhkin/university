import { ApiProperty } from '@nestjs/swagger';
import { IReturnMarkWithCourseLectorStudentNames } from '../../../../services/marks/interfaces/other/return-mark-with-course-lector-student-names.interface';

export class MarkWithCourseLectorStudentNamesDto
  implements IReturnMarkWithCourseLectorStudentNames
{
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

  @ApiProperty({ description: 'Lector name', nullable: false })
  lectorName: string;

  @ApiProperty({ description: 'Student name', nullable: false })
  studentName: string;
}
