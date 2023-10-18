import { ApiProperty } from '@nestjs/swagger';
import { IReturnMark } from 'src/services/marks/interfaces/crud/return-mark.interface';

export class MarkDto implements IReturnMark {
  @ApiProperty({ description: 'Mark id', nullable: false })
  id: string;

  @ApiProperty({ description: 'Mark created date', nullable: false })
  createdAt: Date;

  @ApiProperty({ description: 'Mark updated date', nullable: false })
  updatedAt: Date;

  @ApiProperty({ description: 'Mark value', nullable: false })
  mark: number;

  @ApiProperty({ description: 'Lector id', nullable: false })
  lectorId: string;

  @ApiProperty({ description: 'Student id', nullable: false })
  studentId: string;

  @ApiProperty({ description: 'Course id', nullable: false })
  courseId: string;
}
