import {
  IsEmail,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { ICreateStudent } from 'src/services/students/interfaces/crud/create-student.interface';

export class CreateStudentDto implements ICreateStudent {
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({ description: 'Student email', nullable: false })
  email: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ description: 'Student name', nullable: false })
  name: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ description: 'Student surname', nullable: false })
  surname: string;

  @IsNotEmpty()
  @IsInt()
  @ApiProperty({ description: 'Student age', nullable: false })
  age: number;

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
