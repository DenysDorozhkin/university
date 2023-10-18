import { ApiProperty } from '@nestjs/swagger';

export class MessageResponseDto {
  @ApiProperty({
    description: 'Message wit operation status',
    nullable: false,
  })
  message: string;
}
