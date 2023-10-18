import { Injectable } from '@nestjs/common';
import { GroupsService } from '../../services/groups/groups.service';
import { CreateGroupDto } from './dto/crud/create-group.request.dto';
import { UpdateGroupDto } from './dto/crud/update-group.request.dto';
import { GroupDto } from './dto/crud/group.response.dto';
import { QueryFilterDto } from 'src/application/dto/query.filter.dto';
import { GroupWithStudentsDto } from './dto/other/group-with-students.response.dto';

@Injectable()
export class GroupsControllerService {
  constructor(private readonly groupsService: GroupsService) {}

  // GROUPS CRUD ENDPOINTS ---- GROUPS CRUD ENDPOINTS ---- GROUPS CRUD ENDPOINTS ---- GROUPS CRUD ENDPOINTS ---- GROUPS CRUD ENDPOINTS
  createGroup(createGroupDto: CreateGroupDto): Promise<GroupDto> {
    return this.groupsService.createGroup(createGroupDto);
  }

  getAllGroups(queryFilter: QueryFilterDto): Promise<GroupDto[]> {
    return this.groupsService.getAllGroups(queryFilter);
  }

  getGroupById(id: string): Promise<GroupDto> {
    return this.groupsService.getGroupById(id);
  }

  updateGroup(id: string, updateGroupDto: UpdateGroupDto): Promise<GroupDto> {
    return this.groupsService.updateGroup(id, updateGroupDto);
  }

  removeGroup(id: string): Promise<GroupDto> {
    return this.groupsService.removeGroup(id);
  }
  // GROUPS CRUD ENDPOINTS ---- GROUPS CRUD ENDPOINTS ---- GROUPS CRUD ENDPOINTS ---- GROUPS CRUD ENDPOINTS ---- GROUPS CRUD ENDPOINTS

  // GROUPS OTHER ENDPOINTS ---- GROUPS OTHER ENDPOINTS ---- GROUPS OTHER ENDPOINTS ---- GROUPS OTHER ENDPOINTS ---- GROUPS OTHER ENDPOINTS
  getAllGroupsWithStudents(): Promise<GroupWithStudentsDto[]> {
    return this.groupsService.getAllGroupsWithStudents();
  }

  getGroupByIdWithStudents(id: string): Promise<GroupWithStudentsDto> {
    return this.groupsService.getGroupByIdWithStudents(id);
  }
  // GROUPS OTHER ENDPOINTS ---- GROUPS OTHER ENDPOINTS ---- GROUPS OTHER ENDPOINTS ---- GROUPS OTHER ENDPOINTS ---- GROUPS OTHER ENDPOINTS
}
