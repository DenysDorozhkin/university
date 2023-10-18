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
import { CreateMarkDto } from './dto/crud/create-mark.request.dto';
import { MarksControllerService } from './marks.controller.service';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { MarkDto } from 'src/controllers/marks/dto/crud/mark.response.dto';
import { MarkWithCourseNameDto } from 'src/controllers/marks/dto/other/mark-with-course-name.response.dto';
import { QueryFilterDto } from 'src/application/dto/query.filter.dto';
import { UpdateMarkDto } from './dto/crud/update-mark.request.dto';
import { MarkWithCourseLectorStudentNamesDto } from './dto/other/mark-with-course-lector-student-names.response.dto';
import { AuthGuard } from '../../services/auth/guards/auth.guard';

@ApiTags('Marks')
@ApiBearerAuth('jwt')
@UseGuards(AuthGuard)
@Controller('marks')
export class MarksController {
  constructor(
    private readonly marksControllerService: MarksControllerService,
  ) {}

  // MARKS CRUD ENDPOINTS ---- MARKS CRUD ENDPOINTS ---- MARKS CRUD ENDPOINTS ---- MARKS CRUD ENDPOINTS ---- MARKS CRUD ENDPOINTS
  @ApiOperation({ summary: 'Create a mark' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Created mark',
    type: MarkDto,
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Unauthorized exception',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description:
      'Lector with this id not found; Student with this id not found; Course with this id not found;',
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
  createMarkWithCourseStudentLectorIds(
    @Body() createMarkDto: CreateMarkDto,
  ): Promise<MarkDto> {
    return this.marksControllerService.createMarkWithCourseStudentLectorIds(
      createMarkDto,
    );
  }

  @ApiOperation({ summary: 'Get all marks' })
  @ApiQuery({
    name: 'sortField',
    required: false,
    description: 'Sorting marks by one of the fields: mark',
  })
  @ApiQuery({
    name: 'sortOrder',
    required: false,
    description: 'Sorting order by one of the values: DESC, ASC',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Array of marks',
    type: MarkDto,
    isArray: true,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Sort order must be one of the following values: mark',
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
  getAllMarks(@Query() queryFilter: QueryFilterDto): Promise<MarkDto[]> {
    return this.marksControllerService.getAllMarks(queryFilter);
  }

  @ApiOperation({ summary: 'Get mark by id' })
  @ApiParam({ name: 'id', required: true, description: 'Mark id' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Mark',
    type: MarkDto,
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
    description: 'Mark with this id not found',
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
  getMarkById(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ): Promise<MarkDto> {
    return this.marksControllerService.getMarkById(id);
  }

  @ApiOperation({ summary: 'Update mark by id' })
  @ApiParam({ name: 'id', required: true, description: 'Mark id' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Updated mark',
    type: MarkDto,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Param validation failed; At least one update field must be',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Unauthorized exception',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description:
      'Mark with this id not found; Student with this id not found; Lector with this id not found; Course with this id not found',
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
  updateMark(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body() updateMarkDto: UpdateMarkDto,
  ): Promise<MarkDto> {
    if (Object.keys(updateMarkDto).length === 0)
      throw new BadRequestException('At least one field must be');
    return this.marksControllerService.updateMark(id, updateMarkDto);
  }

  @ApiOperation({ summary: 'Delete mark by id' })
  @ApiParam({ name: 'id', required: true, description: 'Mark id' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Deleted mark',
    type: MarkDto,
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
    description: 'Mark with this id not found',
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
  removeMark(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ): Promise<MarkDto> {
    return this.marksControllerService.removeMark(id);
  }
  // MARKS CRUD ENDPOINTS ---- MARKS CRUD ENDPOINTS ---- MARKS CRUD ENDPOINTS ---- MARKS CRUD ENDPOINTS ---- MARKS CRUD ENDPOINTS

  // MARKS OTHER ENDPOINTS ---- MARKS OTHER ENDPOINTS ---- MARKS OTHER ENDPOINTS ---- MARKS OTHER ENDPOINTS ---- MARKS OTHER ENDPOINTS
  @ApiOperation({ summary: 'Get marks by student id with course name' })
  @ApiParam({ name: 'id', required: true, description: 'Student id' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Student with course name',
    type: MarkWithCourseNameDto,
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
    description: 'Student with this id not found',
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Something went wrong...',
  })
  @ApiResponse({
    status: HttpStatus.HTTP_VERSION_NOT_SUPPORTED,
    description: 'HTTP Version Not Supported',
  })
  @Get('student/:id')
  getMarksByStudentIdWithCourseName(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ): Promise<MarkWithCourseNameDto[]> {
    return this.marksControllerService.getMarksByStudentIdWithCourseName(id);
  }

  @ApiOperation({
    summary: 'Get marks by course id with course, lector, student names',
  })
  @ApiParam({ name: 'id', required: true, description: 'Course id' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Array of marks with course, lector, student names',
    type: MarkWithCourseLectorStudentNamesDto,
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
  @Get('course/:id')
  getMarksByCourseIdWithCourseLectorStudentNames(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ): Promise<MarkWithCourseLectorStudentNamesDto[]> {
    return this.marksControllerService.getMarksByCourseIdWithCourseLectorStudentNames(
      id,
    );
  }
  // MARKS OTHER ENDPOINTS ---- MARKS OTHER ENDPOINTS ---- MARKS OTHER ENDPOINTS ---- MARKS OTHER ENDPOINTS ---- MARKS OTHER ENDPOINTS
}
