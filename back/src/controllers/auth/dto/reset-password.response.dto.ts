import { ApiProperty } from '@nestjs/swagger';

export class ResetPasswordDto {
  @ApiProperty({ description: 'User email', nullable: false })
  email: string;

  @ApiProperty({
    description: 'Message with operation status',
    nullable: false,
  })
  message: string;
}
