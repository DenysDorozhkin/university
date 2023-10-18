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
  HttpStatus,
  Query,
  UseGuards,
} from '@nestjs/common';
import { GroupsControllerService } from './groups.controller.service';
import { CreateGroupDto } from './dto/crud/create-group.request.dto';
import { UpdateGroupDto } from './dto/crud/update-group.request.dto';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { GroupDto } from './dto/crud/group.response.dto';
import { GroupWithStudentsDto } from './dto/other/group-with-students.response.dto';
import { QueryFilterDto } from 'src/application/dto/query.filter.dto';
import { AuthGuard } from '../../services/auth/guards/auth.guard';

@ApiTags('Groups')
@ApiBearerAuth('jwt')
@UseGuards(AuthGuard)
@Controller('groups')
export class GroupsController {
  constructor(
    private readonly groupsControllerService: GroupsControllerService,
  ) {}

  // GROUPS CRUD ENDPOINTS ---- GROUPS CRUD ENDPOINTS ---- GROUPS CRUD ENDPOINTS ---- GROUPS CRUD ENDPOINTS ---- GROUPS CRUD ENDPOINTS
  @ApiOperation({ summary: 'Create a group' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Created group',
    type: GroupDto,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Group with this name already exists',
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
  createGroup(@Body() createGroupDto: CreateGroupDto): Promise<GroupDto> {
    return this.groupsControllerService.createGroup(createGroupDto);
  }

  @ApiOperation({ summary: 'Get all groups' })
  @ApiQuery({
    name: 'sortField',
    required: false,
    description: 'Sorting groups by one of the fields: name',
  })
  @ApiQuery({
    name: 'sortOrder',
    required: false,
    description: 'Sorting order by one of the values: DESC, ASC',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Array of groups',
    type: GroupDto,
    isArray: true,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Sort order must be one of the following values: name',
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
  getAllGroups(@Query() queryFilter: QueryFilterDto): Promise<GroupDto[]> {
    return this.groupsControllerService.getAllGroups(queryFilter);
  }

  @ApiOperation({ summary: 'Get group by id' })
  @ApiParam({ name: 'id', required: true, description: 'Group id' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Group',
    type: GroupDto,
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
    description: 'Group with this id not found',
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
  getGroupById(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ): Promise<GroupDto> {
    return this.groupsControllerService.getGroupById(id);
  }

  @ApiOperation({ summary: 'Update group by id' })
  @ApiParam({ name: 'id', required: true, description: 'Group id' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Updated group',
    type: GroupDto,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description:
      'Param validation failed; At least one update field must be; Group with this name already exists',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Unauthorized exception',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Group with this id not found',
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
  updateGroup(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body() updateGroupDto: UpdateGroupDto,
  ): Promise<GroupDto> {
    if (Object.keys(updateGroupDto).length === 0)
      throw new BadRequestException('At least one field must be');
    return this.groupsControllerService.updateGroup(id, updateGroupDto);
  }

  @ApiOperation({ summary: 'Delete group by id' })
  @ApiParam({ name: 'id', required: true, description: 'Group id' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Deleted group',
    type: GroupDto,
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
    description: 'Group with this id not found',
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
  removeGroup(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ): Promise<GroupDto> {
    return this.groupsControllerService.removeGroup(id);
  }
  // GROUPS CRUD ENDPOINTS ---- GROUPS CRUD ENDPOINTS ---- GROUPS CRUD ENDPOINTS ---- GROUPS CRUD ENDPOINTS ---- GROUPS CRUD ENDPOINTS

  // GROUPS OTHER ENDPOINTS ---- GROUPS OTHER ENDPOINTS ---- GROUPS OTHER ENDPOINTS ---- GROUPS OTHER ENDPOINTS ---- GROUPS OTHER ENDPOINTS
  @ApiOperation({ summary: 'Get all groups with students' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Array of groups with students',
    type: GroupWithStudentsDto,
    isArray: true,
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
  @Get('with-students/all')
  getAllGroupsWithStudents(): Promise<GroupWithStudentsDto[]> {
    return this.groupsControllerService.getAllGroupsWithStudents();
  }

  @ApiOperation({ summary: 'Get group by id with students' })
  @ApiParam({ name: 'id', required: true, description: 'Group id' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Group with students',
    type: GroupWithStudentsDto,
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
    description: 'Group with this id not found',
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Something went wrong...',
  })
  @ApiResponse({
    status: HttpStatus.HTTP_VERSION_NOT_SUPPORTED,
    description: 'HTTP Version Not Supported',
  })
  @Get('with-students/:id')
  getGroupByIdWithStudents(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ): Promise<GroupWithStudentsDto> {
    return this.groupsControllerService.getGroupByIdWithStudents(id);
  }
  // GROUPS OTHER ENDPOINTS ---- GROUPS OTHER ENDPOINTS ---- GROUPS OTHER ENDPOINTS ---- GROUPS OTHER ENDPOINTS ---- GROUPS OTHER ENDPOINTS
}
