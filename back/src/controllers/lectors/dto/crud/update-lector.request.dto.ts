import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { IUpdateLector } from 'src/services/lectors/interfaces/crud/update-lector.interface';

export class UpdateLectorDto implements IUpdateLector {
  @IsOptional()
  @IsEmail()
  @IsNotEmpty()
  @ApiPropertyOptional({ description: 'Lector email', nullable: false })
  email?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @ApiPropertyOptional({ description: 'Lector password', nullable: false })
  password?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @ApiPropertyOptional({ description: 'Lector name', nullable: true })
  name?: string;
}
