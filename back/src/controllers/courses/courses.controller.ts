import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe,
  BadRequestException,
  Query,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { CreateCourseDto } from './dto/crud/create-course.request.dto';
import { CoursesControllerService } from './courses.controller.service';
import { AddLectorToCourseDto } from './dto/other/add-lector-to-course.request.dto';
import { UpdateCourseDto } from './dto/crud/update-course.request.dto';
import { AddStudentToCourseDto } from './dto/other/add-student-to-course.request.dto';
import { CourseDto } from './dto/crud/course.response.dto';
import { CourseWithMessageDto } from './dto/other/course-with-message.response.dto';
import { QueryFilterDto } from 'src/application/dto/query.filter.dto';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AuthGuard } from '../../services/auth/guards/auth.guard';

@ApiTags('Courses')
@ApiBearerAuth('jwt')
@UseGuards(AuthGuard)
@Controller('courses')
export class CoursesController {
  constructor(
    private readonly coursesControllerService: CoursesControllerService,
  ) {}

  // COURSES CRUD ENDPOINTS ---- COURSES CRUD ENDPOINTS ---- COURSES CRUD ENDPOINTS ---- COURSES CRUD ENDPOINTS ---- COURSES CRUD ENDPOINTS
  @ApiOperation({ summary: 'Create a course' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Created course',
    type: CourseDto,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Course with this name already exists',
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
  createCourse(@Body() createCourseDto: CreateCourseDto): Promise<CourseDto> {
    return this.coursesControllerService.createCourse(createCourseDto);
  }

  @ApiOperation({ summary: 'Get all courses' })
  @ApiQuery({
    name: 'sortField',
    required: false,
    description:
      'Sorting courses by one of the fields: name, description, hours',
  })
  @ApiQuery({
    name: 'sortOrder',
    required: false,
    description: 'Sorting order by one of the values: DESC, ASC',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Array of courses',
    type: CourseDto,
    isArray: true,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description:
      'Sort order must be one of the following values: name, description, hours',
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
  getAllCourses(@Query() queryFilter: QueryFilterDto): Promise<CourseDto[]> {
    return this.coursesControllerService.getAllCourses(queryFilter);
  }

  @ApiOperation({ summary: 'Get course by id' })
  @ApiParam({ name: 'id', required: true, description: 'Course id' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Course',
    type: CourseDto,
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
    description: 'Course with this id not found',
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
  getCourseById(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ): Promise<CourseDto> {
    return this.coursesControllerService.getCourseById(id);
  }

  @ApiOperation({ summary: 'Update course by id' })
  @ApiParam({ name: 'id', required: true, description: 'Course id' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Updated course',
    type: CourseDto,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description:
      'Param validation failed; At least one update field must be; Course with this name already exists',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Unauthorized exception',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Course with this id not found',
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
  updateCourse(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body() updateCourseDto: UpdateCourseDto,
  ): Promise<CourseDto> {
    if (Object.keys(updateCourseDto).length === 0)
      throw new BadRequestException('At least one field must be');
    return this.coursesControllerService.updateCourse(id, updateCourseDto);
  }

  @ApiOperation({ summary: 'Delete course by id' })
  @ApiParam({ name: 'id', required: true, description: 'Course id' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Deleted course',
    type: CourseDto,
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
    description: 'Course with this id not found',
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
  removeCourse(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ): Promise<CourseDto> {
    return this.coursesControllerService.removeCourse(id);
  }
  // COURSES CRUD ENDPOINTS ---- COURSES CRUD ENDPOINTS ---- COURSES CRUD ENDPOINTS ---- COURSES CRUD ENDPOINTS ---- COURSES CRUD ENDPOINTS

  // COURSES OTHER ENDPOINTS ---- COURSES OTHER ENDPOINTS ---- COURSES OTHER ENDPOINTS ---- COURSES OTHER ENDPOINTS ---- COURSES OTHER ENDPOINTS
  @ApiOperation({ summary: 'Add lector by course id' })
  @ApiParam({ name: 'id', required: true, description: 'Course id' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Lector successfully added to course',
    type: CourseWithMessageDto,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description:
      'Param validation failed; This lector is already added to this course',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Unauthorized exception',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Course with this id not found; Lector with this id not found',
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Something went wrong...',
  })
  @ApiResponse({
    status: HttpStatus.HTTP_VERSION_NOT_SUPPORTED,
    description: 'HTTP Version Not Supported',
  })
  @Patch('lector/:id')
  addLectorToCourse(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body() addLectorToCourseDto: AddLectorToCourseDto,
  ): Promise<CourseWithMessageDto> {
    return this.coursesControllerService.addLectorToCourse(
      id,
      addLectorToCourseDto,
    );
  }

  @ApiOperation({ summary: 'Add student by course id' })
  @ApiParam({ name: 'id', required: true, description: 'Course id' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Student successfully added to course',
    type: CourseWithMessageDto,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description:
      'Param validation failed; This student is already added to this course',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Unauthorized exception',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description:
      'Course with this id not found; Student with this id not found',
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Something went wrong...',
  })
  @ApiResponse({
    status: HttpStatus.HTTP_VERSION_NOT_SUPPORTED,
    description: 'HTTP Version Not Supported',
  })
  @Patch('student/:id')
  addStudentToCourse(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body() addStudentToCourseDto: AddStudentToCourseDto,
  ): Promise<CourseWithMessageDto> {
    return this.coursesControllerService.addStudentToCourse(
      id,
      addStudentToCourseDto,
    );
  }
  // COURSES OTHER ENDPOINTS ---- COURSES OTHER ENDPOINTS ---- COURSES OTHER ENDPOINTS ---- COURSES OTHER ENDPOINTS ---- COURSES OTHER ENDPOINTS
}
