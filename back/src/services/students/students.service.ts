import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Student } from './entities/student.entity';
import { IReturnStudentWithGroupName } from './interfaces/other/return-student-with-group-name.interface';
import { QueryFilterDto } from 'src/application/dto/query.filter.dto';
import { ICreateStudent } from './interfaces/crud/create-student.interface';
import { IReturnStudent } from './interfaces/crud/return-student.interface';
import { IUpdateStudent } from './interfaces/crud/update-student.interface';
import { NameFilterDto } from 'src/controllers/students/dto/other/name.filter.dto';
import { GroupsService } from '../groups/groups.service';
import { IStudentAvatar } from './interfaces/other/student-avatar.interface';
import { StudentAvatar } from './entities/student-avatar.entity';
import { IReturnStudentAvatar } from './interfaces/other/return-student-avatar.interface';
import { IReturnStudentWithCourses } from './interfaces/other/return-student-with-courses.interface';

@Injectable()
export class StudentsService {
  constructor(
    @InjectRepository(Student)
    private readonly studentsRepository: Repository<Student>,
    @InjectRepository(StudentAvatar)
    private readonly studentsAvatarsRepository: Repository<StudentAvatar>,
    private readonly groupsService: GroupsService,
  ) {}

  // STUDENTS CRUD METHODS ---- STUDENTS CRUD METHODS ---- STUDENTS CRUD METHODS ---- STUDENTS CRUD METHODS ---- STUDENTS CRUD METHODS

  async createStudent(dto: ICreateStudent): Promise<IReturnStudent> {
    const student = await this.studentsRepository.findOne({
      where: { email: dto.email },
    });
    if (student)
      throw new BadRequestException('Student with this email already exists');

    if (dto.groupId) {
      await this.groupsService.getGroupById(dto.groupId);
    }

    const newStudent = this.studentsRepository.create(dto);

    return await this.studentsRepository.save(newStudent);
  }

  async getAllStudents(queryFilter: QueryFilterDto): Promise<IReturnStudent[]> {
    if (!queryFilter.sortField) {
      return await this.studentsRepository.find();
    }

    if (
      queryFilter.sortField === 'name' ||
      queryFilter.sortField === 'surname' ||
      queryFilter.sortField === 'email' ||
      queryFilter.sortField === 'age'
    ) {
      return await this.studentsRepository.find({
        order: {
          [queryFilter.sortField]: queryFilter.sortOrder,
        },
      });
    }
    throw new BadRequestException(
      'Sort order must be one of the following values: name, surname, email, age',
    );
  }

  async getStudentById(id: string): Promise<IReturnStudent> {
    const student = await this.studentsRepository.findOne({
      where: { id },
    });
    if (!student) throw new NotFoundException('Student with this id not found');

    return student;
  }

  async updateStudent(
    id: string,
    dto: IUpdateStudent,
  ): Promise<IReturnStudent> {
    await this.getStudentById(id);

    if (dto.email) {
      const studentEmailCheck = await this.studentsRepository.findOne({
        where: { email: dto.email },
      });
      if (studentEmailCheck)
        throw new BadRequestException('Student with this email already exists');
    }

    if (dto.groupId) {
      await this.groupsService.getGroupById(dto.groupId);
    }

    await this.studentsRepository.update(id, dto);

    return await this.studentsRepository.findOne({
      where: { id },
    });
  }

  async removeStudent(id: string): Promise<IReturnStudent> {
    const student = await this.getStudentById(id);

    await this.studentsRepository.delete(id);

    return student;
  }

  // STUDENTS CRUD METHODS ---- STUDENTS CRUD METHODS ---- STUDENTS CRUD METHODS ---- STUDENTS CRUD METHODS ---- STUDENTS CRUD METHODS

  // STUDENTS OTHER METHODS ---- STUDENTS OTHER METHODS ---- STUDENTS OTHER METHODS ---- STUDENTS OTHER METHODS ---- STUDENTS OTHER METHODS
  async getStudentsWithGroupName(
    nameFilter: NameFilterDto,
  ): Promise<IReturnStudentWithGroupName[]> {
    if (!nameFilter.name) {
      const students = await this.studentsRepository
        .createQueryBuilder('students')
        .select(this.studentFields)
        .leftJoin('students.group', 'groups')
        .addSelect('groups.name as "groupName"')
        .getRawMany();
      return students;
    }

    const students = await this.studentsRepository
      .createQueryBuilder('students')
      .where('students.name LIKE :name', { name: `%${nameFilter.name}%` })
      .select(this.studentFields)
      .leftJoin('students.group', 'groups')
      .addSelect('groups.name as "groupName"')
      .getRawMany();
    return students;
  }

  async getStudentByIdWithGroupName(
    id: string,
  ): Promise<IReturnStudentWithGroupName> {
    const student = await this.studentsRepository
      .createQueryBuilder('students')
      .select(this.studentFields)
      .leftJoin('students.group', 'groups')
      .addSelect('groups.name as "groupName"')
      .where('students.id = :id', { id })
      .getRawOne();
    if (!student) throw new NotFoundException('Student with this id not found');

    return student;
  }

  studentFields = [
    'students.id as id',
    'students.created_at as createdAt',
    'students.updated_at as updatedAt',
    'students.name as name',
    'students.surname as surname',
    'students.email as email',
    'students.age as age',
    'students.imagePath as imagePath',
  ];

  async getStudentsWithCourses(
    nameFilter: NameFilterDto,
  ): Promise<IReturnStudentWithCourses[]> {
    if (!nameFilter.name) {
      const students = await this.studentsRepository
        .createQueryBuilder('students')
        .leftJoinAndSelect('students.courses', 'courses')
        .getMany();

      return students.map((student) => ({
        ...student,
        courses: student.courses,
      }));
    }

    const students = await this.studentsRepository
      .createQueryBuilder('students')
      .where('students.name LIKE :name', { name: `%${nameFilter.name}%` })
      .leftJoinAndSelect('students.courses', 'courses')
      .getMany();

    return students.map((student) => ({
      ...student,
      courses: student.courses,
    }));
  }
  // STUDENTS OTHER METHODS ---- STUDENTS OTHER METHODS ---- STUDENTS OTHER METHODS ---- STUDENTS OTHER METHODS ---- STUDENTS OTHER METHODS

  // STUDENTS-AVATARS METHODS ---- STUDENTS OTHER METHODS ---- STUDENTS OTHER METHODS ---- STUDENTS OTHER METHODS ---- STUDENTS OTHER METHODS
  async updateStudentAvatar(
    id: string,
    avatar: IStudentAvatar,
  ): Promise<IReturnStudent> {
    await this.getStudentById(id);

    const newAvatar = await this.saveStudentAvatarData(avatar);

    await this.studentsRepository.update(id, {
      studentAvatar: newAvatar,
      imagePath: newAvatar.id,
    });

    const student = await this.getStudentById(id);

    return student;
  }

  async saveStudentAvatarData(
    avatar: IStudentAvatar,
  ): Promise<IReturnStudentAvatar> {
    const newAvatar = this.studentsAvatarsRepository.create(avatar);

    await this.studentsAvatarsRepository.save(newAvatar);

    return await this.studentsAvatarsRepository.findOne({
      where: { id: newAvatar.id },
    });
  }

  async getStudentAvatarById(id: string): Promise<IReturnStudentAvatar> {
    const avatar = await this.studentsAvatarsRepository.findOne({
      where: { id },
    });
    if (!avatar)
      throw new NotFoundException('Student avatar with this id not found');

    return avatar;
  }
  // STUDENTS-AVATARS METHODS ---- STUDENTS OTHER METHODS ---- STUDENTS OTHER METHODS ---- STUDENTS OTHER METHODS ---- STUDENTS OTHER METHODS
}
