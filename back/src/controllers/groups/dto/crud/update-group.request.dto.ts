import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { IUpdateGroup } from 'src/services/groups/interfaces/crud/update-group.interface';

export class UpdateGroupDto implements IUpdateGroup {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @ApiPropertyOptional({ description: 'Group name', nullable: false })
  name?: string;
}
