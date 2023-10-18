import {
  Controller,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe,
  BadRequestException,
  Get,
  Query,
  HttpStatus,
  UseGuards,
  UseInterceptors,
  UploadedFile,
  ParseFilePipe,
  MaxFileSizeValidator,
  FileTypeValidator,
  Res,
  StreamableFile,
} from '@nestjs/common';
import { StudentsControllerService } from './students.controller.service';
import { CreateStudentDto } from './dto/crud/create-student.request.dto';
import { UpdateStudentDto } from './dto/crud/update-student.request.dto';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { StudentWithGroupNameDto } from './dto/other/student-with-group-name.response.dto';
import { QueryFilterDto } from 'src/application/dto/query.filter.dto';
import { StudentDto } from './dto/crud/student.response.dto';
import { NameFilterDto } from './dto/other/name.filter.dto';
import { AuthGuard } from '../../services/auth/guards/auth.guard';
import LocalFilesInterceptor from 'src/services/students/interceptors/file.interceptor';
import { Response } from 'express';
import { createReadStream } from 'fs';
import { join } from 'path';
import { StudentWithCoursesDto } from './dto/other/student-with-courses.dto';

@ApiTags('Students')
@ApiBearerAuth('jwt')
@UseGuards(AuthGuard)
@Controller('students')
export class StudentsController {
  constructor(
    private readonly studentsControllerService: StudentsControllerService,
  ) {}

  // STUDENTS CRUD ENDPOINTS ---- STUDENTS CRUD ENDPOINTS ---- STUDENTS CRUD ENDPOINTS ---- STUDENTS CRUD ENDPOINTS ---- STUDENTS CRUD ENDPOINTS
  @ApiOperation({ summary: 'Create a student' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Created student',
    type: StudentDto,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Student with this email already exists',
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
  createStudent(
    @Body() createStudentDto: CreateStudentDto,
  ): Promise<StudentDto> {
    return this.studentsControllerService.createStudent(createStudentDto);
  }

  @ApiOperation({ summary: 'Get all students' })
  @ApiQuery({
    name: 'sortField',
    required: false,
    description:
      'Sorting students by one of the fields: name, surname, email, age',
  })
  @ApiQuery({
    name: 'sortOrder',
    required: false,
    description: 'Sorting order by one of the values: DESC, ASC',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Array of students',
    type: StudentDto,
    isArray: true,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description:
      'Sort order must be one of the following values: name, surname, email, age',
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
  getAllStudents(@Query() queryFilter: QueryFilterDto): Promise<StudentDto[]> {
    return this.studentsControllerService.getAllStudents(queryFilter);
  }

  @ApiOperation({ summary: 'Get student by id' })
  @ApiParam({ name: 'id', required: true, description: 'Student id' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Student',
    type: StudentDto,
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
  @Get(':id')
  getStudentById(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ): Promise<StudentDto> {
    return this.studentsControllerService.getStudentById(id);
  }

  @ApiOperation({ summary: 'Update student by id' })
  @ApiParam({ name: 'id', required: true, description: 'Student id' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Updated student',
    type: StudentDto,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description:
      'Param validation failed; Student with this email already exists',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Unauthorized exception',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Student with this id not found; Group with this id not found',
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
  updateStudent(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body() updateStudentDto: UpdateStudentDto,
  ): Promise<StudentDto> {
    if (Object.keys(updateStudentDto).length === 0)
      throw new BadRequestException('At least one field must be.');
    return this.studentsControllerService.updateStudent(id, updateStudentDto);
  }

  @ApiOperation({ summary: 'Delete student by id' })
  @ApiParam({ name: 'id', required: true, description: 'Student id' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Deleted student',
    type: StudentDto,
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
  @Delete(':id')
  removeStudent(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ): Promise<StudentDto> {
    return this.studentsControllerService.removeStudent(id);
  }
  // STUDENTS CRUD ENDPOINTS ---- STUDENTS CRUD ENDPOINTS ---- STUDENTS CRUD ENDPOINTS ---- STUDENTS CRUD ENDPOINTS ---- STUDENTS CRUD ENDPOINTS

  // STUDENTS OTHER ENDPOINTS ---- STUDENTS OTHER ENDPOINTS ---- STUDENTS OTHER ENDPOINTS ---- STUDENTS OTHER ENDPOINTS ---- STUDENTS OTHER ENDPOINTS
  @ApiOperation({ summary: 'Get students with group name' })
  @ApiQuery({
    name: 'name',
    required: false,
    description: 'Filtering students by name',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Array of students with group name',
    type: StudentWithGroupNameDto,
    isArray: true,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Query validation failed',
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
  @Get('with-group-name/all')
  getStudentsWithGroupName(
    @Query() nameFilter: NameFilterDto,
  ): Promise<StudentWithGroupNameDto[]> {
    return this.studentsControllerService.getStudentsWithGroupName(nameFilter);
  }

  @ApiOperation({ summary: 'Get students with courses' })
  @ApiQuery({
    name: 'name',
    required: false,
    description: 'Filtering students by name',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Array of students with courses',
    type: StudentWithGroupNameDto,
    isArray: true,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Query validation failed',
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
  @Get('with-courses/all')
  getStudentsWithCourses(
    @Query() nameFilter: NameFilterDto,
  ): Promise<StudentWithCoursesDto[]> {
    return this.studentsControllerService.getStudentsWithCourses(nameFilter);
  }

  @ApiOperation({ summary: 'Get student by id with group name' })
  @ApiParam({ name: 'id', required: true, description: 'Student id' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Student with group name',
    type: StudentWithGroupNameDto,
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
  @Get('with-group-name/:id')
  getStudentByIdWithGroupName(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ): Promise<StudentWithGroupNameDto> {
    return this.studentsControllerService.getStudentByIdWithGroupName(id);
  }

  @Post('avatar/:id')
  @UseInterceptors(
    LocalFilesInterceptor({
      fieldName: 'avatar',
      path: '/avatars',
    }),
  )
  updateStudentAvatar(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: Math.pow(1024, 2) * 10 }),
          new FileTypeValidator({ fileType: '.(png|jpeg|jpg)' }),
        ],
      }),
    )
    avatar: Express.Multer.File,
  ): Promise<StudentDto> {
    return this.studentsControllerService.updateStudentAvatar(id, {
      path: avatar.path,
      filename: avatar.originalname,
      mimetype: avatar.mimetype,
    });
  }

  @Get('avatar/:id')
  async getStudentAvatarById(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Res({ passthrough: true }) response: Response,
  ): Promise<StreamableFile> {
    const avatar = await this.studentsControllerService.getStudentAvatarById(
      id,
    );

    const stream = createReadStream(join(process.cwd(), avatar.path));

    response.set({
      'Content-Disposition': `inline; filename="${avatar.filename}"`,
      'Content-Type': avatar.mimetype,
    });

    return new StreamableFile(stream);
  }
  // STUDENTS OTHER ENDPOINTS ---- STUDENTS OTHER ENDPOINTS ---- STUDENTS OTHER ENDPOINTS ---- STUDENTS OTHER ENDPOINTS ---- STUDENTS OTHER ENDPOINTS
}
