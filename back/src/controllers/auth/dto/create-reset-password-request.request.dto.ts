import { IsEmail, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { ICreateResetToken } from 'src/services/reset-tokens/interfaces/create-reset-token.interface';

export class CreateResetPasswordRequestDto implements ICreateResetToken {
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({ description: 'User email', nullable: false })
  email: string;
}
