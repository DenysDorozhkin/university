import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { IUpdatePost } from 'src/services/posts/interfaces/crud/update-post.interface';

export class UpdatePostDto implements IUpdatePost {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @ApiPropertyOptional({ description: 'Post title', nullable: false })
  title?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @ApiPropertyOptional({ description: 'Post description', nullable: false })
  description?: string;
}
