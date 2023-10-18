import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { ICreateLector } from 'src/services/lectors/interfaces/crud/create-lector.interface';

export class CreateLectorDto implements ICreateLector {
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({ description: 'Lector email', nullable: false })
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6, {
    message: 'Password must be at least 6 characters long',
  })
  @ApiProperty({
    description: 'Lector password, at least 6 characters long',
    nullable: false,
  })
  password: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'Lector name', nullable: true })
  name?: string;
}
