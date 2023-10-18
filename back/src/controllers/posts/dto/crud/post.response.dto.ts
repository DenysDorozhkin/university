import { ApiProperty } from '@nestjs/swagger';
import { IReturnPost } from 'src/services/posts/interfaces/crud/return-post.interface';

export class PostDto implements IReturnPost {
  @ApiProperty({ description: 'Post id', nullable: false })
  id: string;

  @ApiProperty({ description: 'Post created date', nullable: false })
  createdAt: Date;

  @ApiProperty({ description: 'Post updated date', nullable: false })
  updatedAt: Date;

  @ApiProperty({ description: 'Post title', nullable: false })
  title: string;

  @ApiProperty({ description: 'Post description', nullable: false })
  description: string;
}
