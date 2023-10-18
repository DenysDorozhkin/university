import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { QueryFilterDto } from 'src/application/dto/query.filter.dto';
import { Post } from './entities/post.entity';
import { ICreatePost } from './interfaces/crud/create-post.interface';
import { IReturnPost } from './interfaces/crud/return-post.interface';
import { IUpdatePost } from './interfaces/crud/update-post.interface';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private readonly postsRepository: Repository<Post>,
  ) {}

  // POSTS CRUD METHODS ---- POSTS CRUD METHODS ---- POSTS CRUD METHODS ---- POSTS CRUD METHODS ---- POSTS CRUD METHODS
  async createPost(dto: ICreatePost): Promise<IReturnPost> {
    const post = await this.postsRepository.findOne({
      where: { title: dto.title },
    });
    if (post)
      throw new BadRequestException('Post with this title already exists');

    const newPost = this.postsRepository.create(dto);

    return await this.postsRepository.save(newPost);
  }

  async getAllPosts(queryFilter: QueryFilterDto): Promise<IReturnPost[]> {
    if (!queryFilter.sortField) {
      return await this.postsRepository.find({
        order: { createdAt: 'DESC' },
      });
    }

    if (
      queryFilter.sortField === 'title' ||
      queryFilter.sortField === 'description'
    ) {
      return await this.postsRepository.find({
        order: {
          [queryFilter.sortField]: queryFilter.sortOrder,
        },
      });
    }
    throw new BadRequestException(
      'Sort order must be one of the following values: title, description',
    );
  }

  async getPostById(id: string): Promise<IReturnPost> {
    const post = await this.postsRepository.findOne({
      where: { id },
    });
    if (!post) throw new NotFoundException('Post with this id not found');

    return post;
  }

  async updatePost(id: string, dto: IUpdatePost): Promise<IReturnPost> {
    await this.getPostById(id);

    if (dto.title) {
      const postTitleCheck = await this.postsRepository.findOne({
        where: { title: dto.title },
      });
      if (postTitleCheck)
        throw new BadRequestException('Post with this title already exists');
    }

    await this.postsRepository.update(id, dto);

    return await this.postsRepository.findOne({
      where: { id },
    });
  }

  async removePost(id: string): Promise<IReturnPost> {
    const post = await this.getPostById(id);

    await this.postsRepository.delete(id);

    return post;
  }
  // POSTS CRUD METHODS ---- POSTS CRUD METHODS ---- POSTS CRUD METHODS ---- POSTS CRUD METHODS ---- POSTS CRUD METHODS
}
