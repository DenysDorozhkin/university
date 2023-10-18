import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SignRequestDto {
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({
    description: 'User email',
    nullable: false,
  })
  email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(6, {
    message: 'Password must be at least 6 characters long',
  })
  @ApiProperty({
    description: 'User password, at least 6 characters long',
    nullable: false,
  })
  password: string;
}
