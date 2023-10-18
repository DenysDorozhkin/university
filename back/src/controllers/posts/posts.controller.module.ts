import { Module } from '@nestjs/common';
import { PostsModule } from 'src/services/posts/posts.module';
import { PostsController } from './posts.controller';
import { PostsControllerService } from './posts.controller.service';

@Module({
  imports: [PostsModule],
  controllers: [PostsController],
  providers: [PostsControllerService],
})
export class PostsControllerModule {}
