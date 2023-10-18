import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEmail,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { IUpdateStudent } from 'src/services/students/interfaces/crud/update-student.interface';

export class UpdateStudentDto implements IUpdateStudent {
  @IsOptional()
  @IsEmail()
  @IsNotEmpty()
  @ApiPropertyOptional({ description: 'Student id', nullable: false })
  email?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @ApiPropertyOptional({ description: 'Student id', nullable: false })
  name?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @ApiPropertyOptional({ description: 'Student surname', nullable: false })
  surname?: string;

  @IsOptional()
  @IsInt()
  @IsNotEmpty()
  @ApiPropertyOptional({ description: 'Student age', nullable: false })
  age?: number;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @ApiPropertyOptional({ description: 'Student image path', nullable: false })
  imagePath?: string;

  @IsOptional()
  @IsUUID()
  @IsNotEmpty()
  @ApiPropertyOptional({ description: 'Group id', nullable: false })
  groupId?: string;
}
