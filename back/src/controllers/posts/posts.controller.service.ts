import { Injectable } from '@nestjs/common';
import { QueryFilterDto } from 'src/application/dto/query.filter.dto';
import { PostsService } from 'src/services/posts/posts.service';
import { PostDto } from './dto/crud/post.response.dto';
import { CreatePostDto } from './dto/crud/create-post.request.dto';
import { UpdatePostDto } from './dto/crud/update-post.request.dto';

@Injectable()
export class PostsControllerService {
  constructor(private readonly postsService: PostsService) {}

  // POSTS CRUD ENDPOINTS ---- POSTS CRUD ENDPOINTS ---- POSTS CRUD ENDPOINTS ---- POSTS CRUD ENDPOINTS ---- POSTS CRUD ENDPOINTS
  createPost(createPostDto: CreatePostDto): Promise<PostDto> {
    return this.postsService.createPost(createPostDto);
  }

  getAllPosts(queryFilter: QueryFilterDto): Promise<PostDto[]> {
    return this.postsService.getAllPosts(queryFilter);
  }

  getPostById(id: string): Promise<PostDto> {
    return this.postsService.getPostById(id);
  }

  updatePost(id: string, updatePostDto: UpdatePostDto): Promise<PostDto> {
    return this.postsService.updatePost(id, updatePostDto);
  }

  removePost(id: string): Promise<PostDto> {
    return this.postsService.removePost(id);
  }
  // POSTS CRUD ENDPOINTS ---- POSTS CRUD ENDPOINTS ---- POSTS CRUD ENDPOINTS ---- POSTS CRUD ENDPOINTS ---- POSTS CRUD ENDPOINTS
}
