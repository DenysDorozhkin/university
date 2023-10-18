import { Injectable } from '@nestjs/common';
import { LectorsService } from '../../services/lectors/lectors.service';
import { CreateLectorDto } from './dto/crud/create-lector.request.dto';
import { UpdateLectorDto } from './dto/crud/update-lector.request.dto';
import { LectorDto } from './dto/crud/lector.response.dto';
import { QueryFilterDto } from 'src/application/dto/query.filter.dto';
import { LectorWithCoursesAndStudentsDto } from './dto/other/lector-with-courses-and-students.response.dto';
import { CourseDto } from '../courses/dto/crud/course.response.dto';

@Injectable()
export class LectorsControllerService {
  constructor(private readonly lectorsService: LectorsService) {}

  // LECTORS CRUD ENDPOINTS ---- LECTORS CRUD ENDPOINTS ---- LECTORS CRUD ENDPOINTS ---- LECTORS CRUD ENDPOINTS ---- LECTORS CRUD ENDPOINTS
  createLector(createLectorDto: CreateLectorDto): Promise<LectorDto> {
    return this.lectorsService.createLector(createLectorDto);
  }

  getAllLectors(queryFilter: QueryFilterDto): Promise<LectorDto[]> {
    return this.lectorsService.getAllLectors(queryFilter);
  }

  getLectorById(id: string): Promise<LectorDto> {
    return this.lectorsService.getLectorById(id);
  }

  updateLector(
    id: string,
    updateLectorDto: UpdateLectorDto,
  ): Promise<LectorDto> {
    return this.lectorsService.updateLector(id, updateLectorDto);
  }

  removeLector(id: string): Promise<LectorDto> {
    return this.lectorsService.removeLector(id);
  }
  // LECTORS CRUD ENDPOINTS ---- LECTORS CRUD ENDPOINTS ---- LECTORS CRUD ENDPOINTS ---- LECTORS CRUD ENDPOINTS ---- LECTORS CRUD ENDPOINTS

  // LECTORS OTHER ENDPOINTS ---- LECTORS OTHER ENDPOINTS ---- LECTORS OTHER ENDPOINTS ---- LECTORS OTHER ENDPOINTS ---- LECTORS OTHER ENDPOINTS
  getLectorCoursesByLectorId(id: string): Promise<CourseDto[]> {
    return this.lectorsService.getLectorCoursesByLectorId(id);
  }

  getLectorByIdWithCoursesAndStudents(
    id: string,
  ): Promise<LectorWithCoursesAndStudentsDto> {
    return this.lectorsService.getLectorByIdWithCoursesAndStudents(id);
  }
  // LECTORS OTHER ENDPOINTS ---- LECTORS OTHER ENDPOINTS ---- LECTORS OTHER ENDPOINTS ---- LECTORS OTHER ENDPOINTS ---- LECTORS OTHER ENDPOINTS
}
