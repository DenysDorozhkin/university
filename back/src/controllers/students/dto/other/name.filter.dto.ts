import { IsOptional, IsString } from 'class-validator';

export class NameFilterDto {
  @IsString()
  @IsOptional()
  public name?: string;
}
