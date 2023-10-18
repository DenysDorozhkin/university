import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Course } from '../courses/entities/course.entity';
import { IReturnStudent } from '../students/interfaces/crud/return-student.interface';

@Injectable()
export class LectorsManagerService {
  constructor(
    @InjectRepository(Course)
    private readonly coursesRepository: Repository<Course>,
  ) {}

  public async getLectorCourseStudents(id: string): Promise<IReturnStudent[]> {
    const courseStudents = await this.coursesRepository
      .createQueryBuilder('course')
      .leftJoinAndSelect('course.students', 'students')
      .where('course.id = :id', { id })
      .getOne();

    return courseStudents.students;
  }
}
