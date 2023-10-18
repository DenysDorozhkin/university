import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Course } from './entities/course.entity';
import { Repository } from 'typeorm';
import { LectorsService } from '../lectors/lectors.service';
import { IReturnCourseWithMessage } from './interfaces/other/return-course-with-message.interface';
import { StudentsService } from '../students/students.service';
import { ICreateCourse } from './interfaces/crud/create-course.interface';
import { IReturnCourse } from './interfaces/crud/return-course.interface';
import { IUpdateCourse } from './interfaces/crud/update-course.interface';
import { IAddLectorToCourse } from './interfaces/other/add-lector-to-course.interface';
import { IAddStudentToCourse } from './interfaces/other/add-student-to-course.interface';
import { QueryFilterDto } from 'src/application/dto/query.filter.dto';

@Injectable()
export class CoursesService {
  constructor(
    @InjectRepository(Course)
    private readonly coursesRepository: Repository<Course>,
    private readonly lectorsServices: LectorsService,
    private readonly studentsServices: StudentsService,
  ) {}

  // COURSES CRUD METHODS ---- COURSES CRUD METHODS ---- COURSES CRUD METHODS ---- COURSES CRUD METHODS ---- COURSES CRUD METHODS
  async createCourse(dto: ICreateCourse): Promise<IReturnCourse> {
    const course = await this.coursesRepository.findOne({
      where: { name: dto.name },
    });
    if (course)
      throw new BadRequestException('Course with this name already exists');

    const newCourse = this.coursesRepository.create(dto);

    return await this.coursesRepository.save(newCourse);
  }

  async getAllCourses(queryFilter: QueryFilterDto): Promise<IReturnCourse[]> {
    if (!queryFilter.sortField) {
      return await this.coursesRepository.find();
    }

    if (
      queryFilter.sortField === 'name' ||
      queryFilter.sortField === 'description' ||
      queryFilter.sortField === 'hours'
    ) {
      return await this.coursesRepository.find({
        order: {
          [queryFilter.sortField]: queryFilter.sortOrder,
        },
      });
    }
    throw new BadRequestException(
      'Sort order must be one of the following values: name, description, hours',
    );
  }

  async getCourseById(id: string): Promise<IReturnCourse> {
    const course = await this.coursesRepository.findOne({
      where: { id },
    });
    if (!course) throw new NotFoundException('Course with this id not found');

    return course;
  }

  async updateCourse(id: string, dto: IUpdateCourse): Promise<IReturnCourse> {
    await this.getCourseById(id);

    if (dto.name) {
      const courseNameCheck = await this.coursesRepository.findOne({
        where: { name: dto.name },
      });
      if (courseNameCheck)
        throw new BadRequestException('Course with this name already exists');
    }

    await this.coursesRepository.update(id, dto);

    return await this.coursesRepository.findOne({
      where: { id },
    });
  }

  async removeCourse(id: string): Promise<IReturnCourse> {
    const course = await this.getCourseById(id);

    await this.coursesRepository.delete(id);

    return course;
  }
  // COURSES CRUD METHODS ---- COURSES CRUD METHODS ---- COURSES CRUD METHODS ---- COURSES CRUD METHODS ---- COURSES CRUD METHODS

  // COURSES OTHER METHODS ---- COURSES OTHER METHODS ---- COURSES OTHER METHODS ---- COURSES OTHER METHODS ---- COURSES OTHER METHODS
  async addLectorToCourse(
    id: string,
    dto: IAddLectorToCourse,
  ): Promise<IReturnCourseWithMessage> {
    const course = await this.getCourseById(id);

    const lector = await this.lectorsServices.getLectorById(dto.lectorId);

    const courseWithLectors = await this.coursesRepository
      .createQueryBuilder('course')
      .leftJoinAndSelect('course.lectors', 'lectors')
      .where('course.id = :id', { id })
      .getOne();

    const isAlreadyLectorAddedToCourse = courseWithLectors.lectors.some(
      (addedLector) => addedLector.id === lector.id,
    );

    if (isAlreadyLectorAddedToCourse)
      throw new BadRequestException(
        'This lector is already added to this course',
      );

    await this.coursesRepository
      .createQueryBuilder()
      .relation(Course, 'lectors')
      .of(course)
      .add(lector);

    return {
      course,
      message: 'Lector successfully added to course',
    };
  }

  async addStudentToCourse(
    id: string,
    dto: IAddStudentToCourse,
  ): Promise<IReturnCourseWithMessage> {
    const course = await this.getCourseById(id);

    const student = await this.studentsServices.getStudentById(dto.studentId);

    const courseWithStudents = await this.coursesRepository
      .createQueryBuilder('course')
      .leftJoinAndSelect('course.students', 'students')
      .where('course.id = :id', { id })
      .getOne();

    const isAlreadyStudentAddedToCourse = courseWithStudents.students.some(
      (addedStudent) => addedStudent.id === student.id,
    );

    if (isAlreadyStudentAddedToCourse)
      throw new BadRequestException(
        'This student is already added to this course',
      );

    await this.coursesRepository
      .createQueryBuilder()
      .relation(Course, 'students')
      .of(course)
      .add(student);

    return {
      course,
      message: 'Student successfully added to course',
    };
  }
  // COURSES OTHER METHODS ---- COURSES OTHER METHODS ---- COURSES OTHER METHODS ---- COURSES OTHER METHODS ---- COURSES OTHER METHODS
}
