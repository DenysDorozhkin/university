import { IsNotEmpty, IsString } from 'class-validator';
import { ICreatePost } from 'src/services/posts/interfaces/crud/create-post.interface';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePostDto implements ICreatePost {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ description: 'Post title', nullable: false })
  title: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ description: 'Post description', nullable: false })
  description: string;
}
