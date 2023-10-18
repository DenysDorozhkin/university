import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  ParseUUIDPipe,
  BadRequestException,
  HttpStatus,
  Query,
} from '@nestjs/common';
import { CreateLectorDto } from './dto/crud/create-lector.request.dto';
import { UpdateLectorDto } from './dto/crud/update-lector.request.dto';
import { LectorsControllerService } from './lectors.controller.service';
import { AuthGuard } from '../../services/auth/guards/auth.guard';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { LectorDto } from 'src/controllers/lectors/dto/crud/lector.response.dto';
import { LectorWithCoursesAndStudentsDto } from 'src/controllers/lectors/dto/other/lector-with-courses-and-students.response.dto';
import { QueryFilterDto } from 'src/application/dto/query.filter.dto';
import { CourseDto } from '../courses/dto/crud/course.response.dto';

@ApiTags('Lectors')
@ApiBearerAuth('jwt')
@UseGuards(AuthGuard)
@Controller('lectors')
export class LectorsController {
  constructor(
    private readonly lectorsControllerService: LectorsControllerService,
  ) {}

  // LECTORS CRUD METHODS ---- LECTORS CRUD METHODS ---- LECTORS CRUD METHODS ---- LECTORS CRUD METHODS ---- LECTORS CRUD METHODS
  @ApiOperation({ summary: 'Create a lector' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Created lector',
    type: LectorDto,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Lector with this email already exists',
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
  createLector(@Body() createLectorDto: CreateLectorDto): Promise<LectorDto> {
    return this.lectorsControllerService.createLector(createLectorDto);
  }

  @ApiOperation({ summary: 'Get all lectors' })
  @ApiQuery({
    name: 'sortField',
    required: false,
    description: 'Sorting lectors by one of the fields: name, email',
  })
  @ApiQuery({
    name: 'sortOrder',
    required: false,
    description: 'Sorting order by one of the values: DESC, ASC',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Array of lectors',
    type: LectorDto,
    isArray: true,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Sort order must be one of the following values: name, email',
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
  getAllLectors(@Query() queryFilter: QueryFilterDto): Promise<LectorDto[]> {
    return this.lectorsControllerService.getAllLectors(queryFilter);
  }

  @ApiOperation({ summary: 'Get lector by id' })
  @ApiParam({ name: 'id', required: true, description: 'Lector id' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Lector',
    type: LectorDto,
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
    description: 'Lector with this id not found',
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
  getLectorById(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ): Promise<LectorDto> {
    return this.lectorsControllerService.getLectorById(id);
  }

  @ApiOperation({ summary: 'Update lector by id' })
  @ApiParam({ name: 'id', required: true, description: 'Lector id' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Updated lector',
    type: LectorDto,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description:
      'Param validation failed; At least one update field must be; Lector with this email already exists',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Unauthorized exception',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Lector with this id not found',
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
  updateLector(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body() updateLectorDto: UpdateLectorDto,
  ): Promise<LectorDto> {
    if (Object.keys(updateLectorDto).length === 0)
      throw new BadRequestException('At least one field must be');
    return this.lectorsControllerService.updateLector(id, updateLectorDto);
  }

  @ApiOperation({ summary: 'Delete lector by id' })
  @ApiParam({ name: 'id', required: true, description: 'Lector id' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Deleted lector',
    type: LectorDto,
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
    description: 'Lector with this id not found',
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
  removeLector(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ): Promise<LectorDto> {
    return this.lectorsControllerService.removeLector(id);
  }
  // LECTORS CRUD METHODS ---- LECTORS CRUD METHODS ---- LECTORS CRUD METHODS ---- LECTORS CRUD METHODS ---- LECTORS CRUD METHODS

  // LECTORS OTHER METHODS ---- LECTORS OTHER METHODS ---- LECTORS OTHER METHODS ---- LECTORS OTHER METHODS ---- LECTORS OTHER METHODS
  @ApiOperation({ summary: 'Get lector courses by lector id' })
  @ApiParam({ name: 'id', required: true, description: 'Lector id' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Array of lector courses',
    type: CourseDto,
    isArray: true,
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
    description: 'Lector with this id not found',
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Something went wrong...',
  })
  @ApiResponse({
    status: HttpStatus.HTTP_VERSION_NOT_SUPPORTED,
    description: 'HTTP Version Not Supported',
  })
  @Get('courses/:id')
  getLectorCoursesByLectorId(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ): Promise<CourseDto[]> {
    return this.lectorsControllerService.getLectorCoursesByLectorId(id);
  }

  @ApiOperation({ summary: 'Get lector by id with courses and students' })
  @ApiParam({ name: 'id', required: true, description: 'Lector id' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Lector with courses and students',
    type: LectorWithCoursesAndStudentsDto,
    isArray: true,
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
    description: 'Lector with this id not found',
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Something went wrong...',
  })
  @ApiResponse({
    status: HttpStatus.HTTP_VERSION_NOT_SUPPORTED,
    description: 'HTTP Version Not Supported',
  })
  @Get('with-courses-and-students/:id')
  getLectorByIdWithCoursesAndStudents(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ): Promise<LectorWithCoursesAndStudentsDto> {
    return this.lectorsControllerService.getLectorByIdWithCoursesAndStudents(
      id,
    );
  }
  // LECTORS OTHER METHODS ---- LECTORS OTHER METHODS ---- LECTORS OTHER METHODS ---- LECTORS OTHER METHODS ---- LECTORS OTHER METHODS
}
