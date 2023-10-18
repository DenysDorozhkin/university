import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { Lector } from './entities/lector.entity';
import { Repository } from 'typeorm';
import { IReturnLector } from './interfaces/crud/return-lector.interface';
import { Course } from '../courses/entities/course.entity';
import { IReturnLectorWithCoursesAndStudents } from './interfaces/other/return-lector-with-courses-and-students.interface';
import { LectorsManagerService } from '../lectors-manager/lectors-manager.service';
import { ICreateLector } from './interfaces/crud/create-lector.interface';
import { QueryFilterDto } from 'src/application/dto/query.filter.dto';
import { IUpdateLector } from './interfaces/crud/update-lector.interface';
import { IReturnCourse } from '../courses/interfaces/crud/return-course.interface';
import { IResetToken } from '../reset-tokens/interfaces/reset-token.interface';

@Injectable()
export class LectorsService {
  constructor(
    @InjectRepository(Lector)
    private readonly lectorsRepository: Repository<Lector>,
    private readonly lectorsManagerService: LectorsManagerService,
  ) {}

  // LECTORS CRUD ENDPOINTS ---- LECTORS CRUD ENDPOINTS ---- LECTORS CRUD ENDPOINTS ---- LECTORS CRUD ENDPOINTS ---- LECTORS CRUD ENDPOINTS
  async createLector(dto: ICreateLector): Promise<IReturnLector> {
    const { name, email, password } = dto;

    await this.checkLectorByEmail(email);

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const newLector = this.lectorsRepository.create({
      name,
      email,
      password: hashedPassword,
    });

    const savedLector = await this.lectorsRepository.save(newLector);

    const returnLector: IReturnLector = {
      id: savedLector.id,
      createdAt: savedLector.createdAt,
      updatedAt: savedLector.updatedAt,
      email: savedLector.email,
      name: savedLector.name,
    };
    return returnLector;
  }

  async getAllLectors(queryFilter: QueryFilterDto): Promise<IReturnLector[]> {
    if (!queryFilter.sortField) {
      return await this.lectorsRepository.find({
        select: ['id', 'createdAt', 'updatedAt', 'name', 'email'],
      });
    }

    if (queryFilter.sortField === 'name' || queryFilter.sortField === 'email') {
      return await this.lectorsRepository.find({
        select: ['id', 'createdAt', 'updatedAt', 'name', 'email'],
        order: {
          [queryFilter.sortField]: queryFilter.sortOrder,
        },
      });
    }
    throw new BadRequestException(
      'Sort order must be one of the following values: name, email',
    );
  }

  async getLectorById(id: string): Promise<IReturnLector> {
    const lector = await this.lectorsRepository.findOne({
      where: { id },
      select: ['id', 'createdAt', 'updatedAt', 'name', 'email'],
    });
    if (!lector) throw new NotFoundException('Lector with this id not found');

    return lector;
  }

  async updateLector(id: string, dto: IUpdateLector): Promise<IReturnLector> {
    await this.getLectorById(id);

    if (dto.email) {
      await this.checkLectorByEmail(dto.email);
    }

    if (dto.password) {
      const salt = await bcrypt.genSalt();
      dto.password = await bcrypt.hash(dto.password, salt);
      await this.lectorsRepository.update(id, dto);
    } else {
      await this.lectorsRepository.update(id, dto);
    }

    return await this.lectorsRepository.findOne({
      where: { id },
      select: ['id', 'createdAt', 'updatedAt', 'name', 'email'],
    });
  }

  async removeLector(id: string): Promise<IReturnLector> {
    const lector = await this.getLectorById(id);

    await this.lectorsRepository.delete(id);

    return lector;
  }
  // LECTORS CRUD ENDPOINTS ---- LECTORS CRUD ENDPOINTS ---- LECTORS CRUD ENDPOINTS ---- LECTORS CRUD ENDPOINTS ---- LECTORS CRUD ENDPOINTS
  // LECTORS OTHER ENDPOINTS ---- LECTORS OTHER ENDPOINTS ---- LECTORS OTHER ENDPOINTS ---- LECTORS OTHER ENDPOINTS ---- LECTORS OTHER ENDPOINTS
  async getLectorCoursesByLectorId(id: string): Promise<IReturnCourse[]> {
    const lector = await this.lectorsRepository.findOne({
      where: { id },
      relations: ['courses'],
    });

    if (!lector) {
      throw new NotFoundException('Lector with this id not found');
    }

    return lector.courses;
  }

  async getLectorByIdWithCoursesAndStudents(
    id: string,
  ): Promise<IReturnLectorWithCoursesAndStudents> {
    const lector = await this.getLectorById(id);

    const lectorWithCourses = await this.lectorsRepository
      .createQueryBuilder('lector')
      .leftJoinAndSelect('lector.courses', 'courses')
      .where('lector.id = :id', { id })
      .getOne();

    const coursesWithStudents = await Promise.all(
      lectorWithCourses.courses.map(async (course: Course) => {
        const students =
          await this.lectorsManagerService.getLectorCourseStudents(course.id);
        return {
          ...course,
          students,
        };
      }),
    );

    return {
      ...lector,
      courses: coursesWithStudents,
    };
  }
  // LECTORS OTHER ENDPOINTS ---- LECTORS OTHER ENDPOINTS ---- LECTORS OTHER ENDPOINTS ---- LECTORS OTHER ENDPOINTS ---- LECTORS OTHER ENDPOINTS

  // LECTORS BASIC METHODS ---- LECTORS BASIC METHODS ---- LECTORS BASIC METHODS ---- LECTORS BASIC METHODS ---- LECTORS BASIC METHODS
  async getLectorByEmail(email: string): Promise<Lector> {
    const lector = await this.lectorsRepository.findOne({
      where: { email },
    });
    // if (!lector)
    //   throw new NotFoundException('Lector with this email not found');

    return lector;
  }
  async getLectorByEmailWithoutPassword(email: string): Promise<Lector> {
    const lector = await this.lectorsRepository.findOne({
      where: { email },
      select: ['id', 'createdAt', 'updatedAt', 'name', 'email'],
    });
    if (!lector)
      throw new NotFoundException('Lector with this email not found');

    return lector;
  }
  async checkLectorByEmail(email: string): Promise<Lector> {
    const lector = await this.lectorsRepository.findOne({
      where: { email },
    });
    if (lector)
      throw new BadRequestException('Lector with this email already exists');

    return lector;
  }
  async updateLectorPassword(
    id: string,
    password: string,
  ): Promise<IReturnLector> {
    await this.getLectorById(id);

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    await this.lectorsRepository.update(id, { password: hashedPassword });

    return await this.lectorsRepository.findOne({
      where: { id },
      select: ['id', 'createdAt', 'updatedAt', 'name', 'email'],
    });
  }
  async updateLectorResetToken(
    id: string,
    token: IResetToken,
  ): Promise<IReturnLector> {
    await this.getLectorById(id);

    await this.lectorsRepository.update(id, { resetToken: token });

    return await this.lectorsRepository.findOne({
      where: { id },
      select: ['id', 'createdAt', 'updatedAt', 'name', 'email'],
    });
  }
  async getLectorByIdWithResetToken(id: string): Promise<Lector> {
    const lector = await this.lectorsRepository.findOne({
      where: { id },
      relations: ['resetToken'],
    });
    if (!lector) throw new NotFoundException('Lector with this id not found');

    return lector;
  }
  // LECTORS BASIC METHODS ---- LECTORS BASIC METHODS ---- LECTORS BASIC METHODS ---- LECTORS BASIC METHODS ---- LECTORS BASIC METHODS
}
