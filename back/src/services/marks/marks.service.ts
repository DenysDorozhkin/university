import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Mark } from './entities/mark.entity';
import { IReturnMarkWithCourseName } from './interfaces/other/return-mark-with-course-name.interface';
import { IReturnMarkWithCourseLectorStudentNames } from './interfaces/other/return-mark-with-course-lector-student-names.interface';
import { IReturnMark } from './interfaces/crud/return-mark.interface';
import { StudentsService } from '../students/students.service';
import { CoursesService } from '../courses/courses.service';
import { LectorsService } from '../lectors/lectors.service';
import { ICreateMark } from './interfaces/crud/create-mark.interface';
import { QueryFilterDto } from 'src/application/dto/query.filter.dto';
import { IUpdateMark } from './interfaces/crud/update-mark.interface';

@Injectable()
export class MarksService {
  constructor(
    @InjectRepository(Mark)
    private readonly marksRepository: Repository<Mark>,
    private readonly studentsService: StudentsService,
    private readonly coursesService: CoursesService,
    private readonly lectorsService: LectorsService,
  ) {}

  // MARKS CRUD METHODS ---- MARKS CRUD METHODS ---- MARKS CRUD METHODS ---- MARKS CRUD METHODS ---- MARKS CRUD METHODS
  async createMarkWithCourseStudentLectorIds(
    dto: ICreateMark,
  ): Promise<IReturnMark> {
    await this.studentsService.getStudentById(dto.studentId);
    await this.lectorsService.getLectorById(dto.lectorId);
    await this.coursesService.getCourseById(dto.courseId);
    return this.marksRepository.save(dto);
  }

  async getAllMarks(queryFilter: QueryFilterDto): Promise<IReturnMark[]> {
    if (!queryFilter.sortField) {
      return await this.marksRepository.find();
    }

    if (queryFilter.sortField === 'mark') {
      return await this.marksRepository.find({
        order: {
          [queryFilter.sortField as any]: queryFilter.sortOrder,
        },
      });
    }
    throw new BadRequestException(
      'Sort order must be one of the following values: mark',
    );
  }

  async getMarkById(id: string): Promise<IReturnMark> {
    const mark = await this.marksRepository.findOne({
      where: { id },
    });
    if (!mark) throw new NotFoundException('Mark with this id not found');

    return mark;
  }

  async updateMark(id: string, dto: IUpdateMark): Promise<IReturnMark> {
    await this.getMarkById(id);

    if (dto.courseId) {
      await this.coursesService.getCourseById(dto.courseId);
    }

    if (dto.lectorId) {
      await this.lectorsService.getLectorById(dto.lectorId);
    }

    if (dto.studentId) {
      await this.studentsService.getStudentById(dto.studentId);
    }

    await this.marksRepository.update(id, dto);

    return await this.marksRepository.findOne({
      where: { id },
    });
  }

  async removeMark(id: string): Promise<IReturnMark> {
    const mark = await this.getMarkById(id);

    await this.marksRepository.delete(id);

    return mark;
  }

  // MARKS CRUD METHODS ---- MARKS CRUD METHODS ---- MARKS CRUD METHODS ---- MARKS CRUD METHODS ---- MARKS CRUD METHODS

  // MARKS OTHER METHODS ---- MARKS OTHER METHODS ---- MARKS OTHER METHODS ---- MARKS OTHER METHODS ---- MARKS OTHER METHODS
  async getMarksByStudentIdWithCourseName(
    id: string,
  ): Promise<IReturnMarkWithCourseName[]> {
    await this.studentsService.getStudentById(id);

    const studentMarks = await this.marksRepository
      .createQueryBuilder('marks')
      .select([
        'marks.id as id',
        'marks.created_at as createdAt',
        'marks.updated_at as updatedAt',
        'marks.mark as mark',
        'marks.studentId as studentId',
        'marks.lectorId as lectorId',
      ])
      .leftJoin('marks.course', 'courses')
      .addSelect('courses.name as "courseName"')
      .where('marks.student_id = :id', { id })
      .getRawMany();

    return studentMarks;
  }

  async getMarksByCourseIdWithCourseLectorStudentNames(
    id: string,
  ): Promise<IReturnMarkWithCourseLectorStudentNames[]> {
    await this.coursesService.getCourseById(id);

    const courseMarks = await this.marksRepository
      .createQueryBuilder('marks')
      .select([
        'marks.id as id',
        'marks.created_at as createdAt',
        'marks.updated_at as updatedAt',
        'marks.mark as mark',
        'course.name as course',
        'lector.name as lector',
        'student.name as student',
      ])
      .innerJoin('marks.course', 'course')
      .innerJoin('marks.lector', 'lector')
      .innerJoin('marks.student', 'student')
      .where('course.id = :id', { id })
      .getRawMany();

    return courseMarks;
  }
  // MARKS OTHER METHODS ---- MARKS OTHER METHODS ---- MARKS OTHER METHODS ---- MARKS OTHER METHODS ---- MARKS OTHER METHODS
}
