import { ApiProperty } from '@nestjs/swagger';

export class SignResponseDto {
  @ApiProperty({
    description: 'Access token',
    nullable: false,
  })
  accessToken: string;
}
