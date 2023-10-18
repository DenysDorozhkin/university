import { IsNotEmpty, IsNumber, IsUUID } from 'class-validator';
import { ICreateMark } from 'src/services/marks/interfaces/crud/create-mark.interface';
import { ApiProperty } from '@nestjs/swagger';

export class CreateMarkDto implements ICreateMark {
  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({ description: 'Mark value', nullable: false })
  mark: number;

  @IsNotEmpty()
  @IsUUID()
  @ApiProperty({ description: 'Lector id', nullable: false })
  lectorId: string;

  @IsNotEmpty()
  @IsUUID()
  @ApiProperty({ description: 'Student id', nullable: false })
  studentId: string;

  @IsNotEmpty()
  @IsUUID()
  @ApiProperty({ description: 'Course id', nullable: false })
  courseId: string;
}
