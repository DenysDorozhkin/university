import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { ICreateGroup } from 'src/services/groups/interfaces/crud/create-group.interface';

export class CreateGroupDto implements ICreateGroup {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ description: 'Group name', nullable: false })
  name: string;
}
