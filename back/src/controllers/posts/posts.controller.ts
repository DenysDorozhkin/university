import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
  ParseUUIDPipe,
  HttpStatus,
  Query,
  Patch,
  BadRequestException,
  Delete,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { QueryFilterDto } from 'src/application/dto/query.filter.dto';
import { PostsControllerService } from './posts.controller.service';
import { CreatePostDto } from './dto/crud/create-post.request.dto';
import { PostDto } from './dto/crud/post.response.dto';
import { UpdatePostDto } from './dto/crud/update-post.request.dto';
import { AuthGuard } from '../../services/auth/guards/auth.guard';

@ApiTags('Posts')
@ApiBearerAuth('jwt')
@UseGuards(AuthGuard)
@Controller('posts')
export class PostsController {
  constructor(
    private readonly postsControllerService: PostsControllerService,
  ) {}

  // POSTS CRUD ENDPOINTS ---- POSTS CRUD ENDPOINTS ---- POSTS CRUD ENDPOINTS ---- POSTS CRUD ENDPOINTS ---- POSTS CRUD ENDPOINTS
  @ApiOperation({ summary: 'Create a post' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Created post',
    type: PostDto,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Post with this title already exists',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Unauthorized exception',
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Something went wrong...',
  })
  @ApiResponse({
    status: HttpStatus.HTTP_VERSION_NOT_SUPPORTED,
    description: 'HTTP Version Not Supported',
  })
  @Post()
  createPost(@Body() createPostDto: CreatePostDto): Promise<PostDto> {
    return this.postsControllerService.createPost(createPostDto);
  }

  @ApiOperation({ summary: 'Get all posts' })
  @ApiQuery({
    name: 'sortField',
    required: false,
    description: 'Sorting posts by one of the fields: title, description',
  })
  @ApiQuery({
    name: 'sortOrder',
    required: false,
    description: 'Sorting order by one of the values: DESC, ASC',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Array of posts',
    type: PostDto,
    isArray: true,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description:
      'Sort order must be one of the following values: title, description',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Unauthorized exception',
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Something went wrong...',
  })
  @ApiResponse({
    status: HttpStatus.HTTP_VERSION_NOT_SUPPORTED,
    description: 'HTTP Version Not Supported',
  })
  @Get()
  getAllPosts(@Query() queryFilter: QueryFilterDto): Promise<PostDto[]> {
    return this.postsControllerService.getAllPosts(queryFilter);
  }

  @ApiOperation({ summary: 'Get post by id' })
  @ApiParam({ name: 'id', required: true, description: 'Post id' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Post',
    type: PostDto,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Param validation failed',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Unauthorized exception',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Post with this id not found',
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Something went wrong...',
  })
  @ApiResponse({
    status: HttpStatus.HTTP_VERSION_NOT_SUPPORTED,
    description: 'HTTP Version Not Supported',
  })
  @Get(':id')
  getPostById(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ): Promise<PostDto> {
    return this.postsControllerService.getPostById(id);
  }

  @ApiOperation({ summary: 'Update post by id' })
  @ApiParam({ name: 'id', required: true, description: 'Post id' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Updated post',
    type: PostDto,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description:
      'Param validation failed; At least one update field must be; Post with this title already exists',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Unauthorized exception',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Post with this id not found',
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Something went wrong...',
  })
  @ApiResponse({
    status: HttpStatus.HTTP_VERSION_NOT_SUPPORTED,
    description: 'HTTP Version Not Supported',
  })
  @Patch(':id')
  updatePost(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body() updatePostDto: UpdatePostDto,
  ): Promise<PostDto> {
    if (Object.keys(updatePostDto).length === 0)
      throw new BadRequestException('At least one field must be');
    return this.postsControllerService.updatePost(id, updatePostDto);
  }

  @ApiOperation({ summary: 'Delete post by id' })
  @ApiParam({ name: 'id', required: true, description: 'Post id' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Deleted post',
    type: PostDto,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Param validation failed',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Unauthorized exception',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Post with this id not found',
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Something went wrong...',
  })
  @ApiResponse({
    status: HttpStatus.HTTP_VERSION_NOT_SUPPORTED,
    description: 'HTTP Version Not Supported',
  })
  @Delete(':id')
  removePost(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ): Promise<PostDto> {
    return this.postsControllerService.removePost(id);
  }
  // POSTS CRUD ENDPOINTS ---- POSTS CRUD ENDPOINTS ---- POSTS CRUD ENDPOINTS ---- POSTS CRUD ENDPOINTS ---- POSTS CRUD ENDPOINTS
}
