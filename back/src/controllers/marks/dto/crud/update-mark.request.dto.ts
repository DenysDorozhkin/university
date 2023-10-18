import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsUUID } from 'class-validator';
import { IUpdateMark } from 'src/services/marks/interfaces/crud/update-mark.interface';

export class UpdateMarkDto implements IUpdateMark {
  @IsOptional()
  @IsNumber()
  @IsNotEmpty()
  @ApiPropertyOptional({ description: 'Mark value', nullable: false })
  mark?: number;

  @IsOptional()
  @IsUUID()
  @IsNotEmpty()
  @ApiPropertyOptional({ description: 'Course id', nullable: false })
  courseId?: string;

  @IsOptional()
  @IsUUID()
  @IsNotEmpty()
  @ApiPropertyOptional({ description: 'Lector id', nullable: false })
  lectorId?: string;

  @IsOptional()
  @IsUUID()
  @IsNotEmpty()
  @ApiPropertyOptional({ description: 'Student id', nullable: false })
  studentId?: string;
}
