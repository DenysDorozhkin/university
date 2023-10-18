import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateResetPasswordDto {
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({ description: 'User email', nullable: false })
  email: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ description: 'Reset password token', nullable: false })
  token: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(6, {
    message: 'Password must be at least 6 characters long',
  })
  @ApiProperty({ description: 'User new password', nullable: false })
  password: string;
}
