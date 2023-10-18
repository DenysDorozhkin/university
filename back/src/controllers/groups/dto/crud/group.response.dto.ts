import { ApiProperty } from '@nestjs/swagger';
import { IReturnGroup } from 'src/services/groups/interfaces/crud/return-group.interface';

export class GroupDto implements IReturnGroup {
  @ApiProperty({ description: 'Group id', nullable: false })
  id: string;

  @ApiProperty({ description: 'Group created date', nullable: false })
  createdAt: Date;

  @ApiProperty({ description: 'Group updated date', nullable: false })
  updatedAt: Date;

  @ApiProperty({ description: 'Group name', nullable: false })
  name: string;
}
