import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Group } from './entities/group.entity';
import { IReturnGroupWithStudents } from './interfaces/other/return-group-with-students.interface';
import { ICreateGroup } from './interfaces/crud/create-group.interface';
import { IReturnGroup } from './interfaces/crud/return-group.interface';
import { QueryFilterDto } from 'src/application/dto/query.filter.dto';
import { IUpdateGroup } from './interfaces/crud/update-group.interface';

@Injectable()
export class GroupsService {
  constructor(
    @InjectRepository(Group)
    private readonly groupsRepository: Repository<Group>,
  ) {}

  // GROUPS CRUD METHODS ---- GROUPS CRUD METHODS ---- GROUPS CRUD METHODS ---- GROUPS CRUD METHODS ---- GROUPS CRUD METHODS
  async createGroup(dto: ICreateGroup): Promise<IReturnGroup> {
    const group = await this.groupsRepository.findOne({
      where: { name: dto.name },
    });
    if (group)
      throw new BadRequestException('Group with this name already exists');

    const newGroup = this.groupsRepository.create(dto);

    return await this.groupsRepository.save(newGroup);
  }

  async getAllGroups(queryFilter: QueryFilterDto): Promise<IReturnGroup[]> {
    if (!queryFilter.sortField) {
      return await this.groupsRepository.find();
    }

    if (queryFilter.sortField === 'name') {
      return await this.groupsRepository.find({
        order: {
          [queryFilter.sortField as any]: queryFilter.sortOrder,
        },
      });
    }
    throw new BadRequestException(
      'Sort order must be one of the following values: name',
    );
  }

  async getGroupById(id: string): Promise<IReturnGroup> {
    const group = await this.groupsRepository.findOne({
      where: { id },
    });
    if (!group) throw new NotFoundException('Group with this id not found');

    return group;
  }

  async updateGroup(id: string, dto: IUpdateGroup): Promise<IReturnGroup> {
    await this.getGroupById(id);

    if (dto.name) {
      const groupNameCheck = await this.groupsRepository.findOne({
        where: { name: dto.name },
      });
      if (groupNameCheck)
        throw new BadRequestException('Group with this name already exists');
    }

    await this.groupsRepository.update(id, dto);

    return await this.groupsRepository.findOne({
      where: { id },
    });
  }

  async removeGroup(id: string): Promise<IReturnGroup> {
    const group = await this.getGroupById(id);

    await this.groupsRepository.delete(id);

    return group;
  }
  // GROUPS CRUD METHODS ---- GROUPS CRUD METHODS ---- GROUPS CRUD METHODS ---- GROUPS CRUD METHODS ---- GROUPS CRUD METHODS

  // GROUPS OTHER METHODS ---- GROUPS OTHER METHODS ---- GROUPS OTHER METHODS ---- GROUPS OTHER METHODS ---- GROUPS OTHER METHODS
  async getAllGroupsWithStudents(): Promise<IReturnGroupWithStudents[]> {
    const groups = await this.groupsRepository
      .createQueryBuilder('groups')
      .leftJoinAndSelect('groups.students', 'students')
      .getMany();

    return groups;
  }

  async getGroupByIdWithStudents(
    id: string,
  ): Promise<IReturnGroupWithStudents> {
    const group = await this.groupsRepository
      .createQueryBuilder('groups')
      .leftJoinAndSelect('groups.students', 'students')
      .where('groups.id = :id', { id })
      .getOne();

    if (!group) throw new NotFoundException('Group with this id not found');

    return group;
  }
  // GROUPS OTHER METHODS ---- GROUPS OTHER METHODS ---- GROUPS OTHER METHODS ---- GROUPS OTHER METHODS ---- GROUPS OTHER METHODS
}
