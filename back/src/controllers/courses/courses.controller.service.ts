import { Injectable } from '@nestjs/common';
import { CoursesService } from '../../services/courses/courses.service';
import { CreateCourseDto } from './dto/crud/create-course.request.dto';
import { UpdateCourseDto } from './dto/crud/update-course.request.dto';
import { AddLectorToCourseDto } from 'src/controllers/courses/dto/other/add-lector-to-course.request.dto';
import { AddStudentToCourseDto } from 'src/controllers/courses/dto/other/add-student-to-course.request.dto';
import { CourseDto } from './dto/crud/course.response.dto';
import { CourseWithMessageDto } from './dto/other/course-with-message.response.dto';
import { QueryFilterDto } from 'src/application/dto/query.filter.dto';

@Injectable()
export class CoursesControllerService {
  constructor(private readonly coursesService: CoursesService) {}

  // COURSES CRUD ENDPOINTS ---- COURSES CRUD ENDPOINTS ---- COURSES CRUD ENDPOINTS ---- COURSES CRUD ENDPOINTS ---- COURSES CRUD ENDPOINTS
  createCourse(createCourseDto: CreateCourseDto): Promise<CourseDto> {
    return this.coursesService.createCourse(createCourseDto);
  }

  getAllCourses(queryFilter: QueryFilterDto): Promise<CourseDto[]> {
    return this.coursesService.getAllCourses(queryFilter);
  }

  getCourseById(id: string): Promise<CourseDto> {
    return this.coursesService.getCourseById(id);
  }

  updateCourse(
    id: string,
    updateCourseDto: UpdateCourseDto,
  ): Promise<CourseDto> {
    return this.coursesService.updateCourse(id, updateCourseDto);
  }

  removeCourse(id: string): Promise<CourseDto> {
    return this.coursesService.removeCourse(id);
  }
  // COURSES CRUD ENDPOINTS ---- COURSES CRUD ENDPOINTS ---- COURSES CRUD ENDPOINTS ---- COURSES CRUD ENDPOINTS ---- COURSES CRUD ENDPOINTS

  // COURSES OTHER ENDPOINTS ---- COURSES OTHER ENDPOINTS ---- COURSES OTHER ENDPOINTS ---- COURSES OTHER ENDPOINTS ---- COURSES OTHER ENDPOINTS
  addLectorToCourse(
    id: string,
    addLectorToCourseDto: AddLectorToCourseDto,
  ): Promise<CourseWithMessageDto> {
    return this.coursesService.addLectorToCourse(id, addLectorToCourseDto);
  }

  addStudentToCourse(
    id: string,
    addStudentToCourseDto: AddStudentToCourseDto,
  ): Promise<CourseWithMessageDto> {
    return this.coursesService.addStudentToCourse(id, addStudentToCourseDto);
  }
  // COURSES OTHER ENDPOINTS ---- COURSES OTHER ENDPOINTS ---- COURSES OTHER ENDPOINTS ---- COURSES OTHER ENDPOINTS ---- COURSES OTHER ENDPOINTS
}
