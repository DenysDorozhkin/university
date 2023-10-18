import { Injectable } from '@nestjs/common';
import { MarksService } from '../../services/marks/marks.service';
import { CreateMarkDto } from './dto/crud/create-mark.request.dto';
import { MarkDto } from './dto/crud/mark.response.dto';
import { QueryFilterDto } from 'src/application/dto/query.filter.dto';
import { UpdateMarkDto } from './dto/crud/update-mark.request.dto';
import { MarkWithCourseNameDto } from './dto/other/mark-with-course-name.response.dto';
import { MarkWithCourseLectorStudentNamesDto } from './dto/other/mark-with-course-lector-student-names.response.dto';

@Injectable()
export class MarksControllerService {
  constructor(private readonly marksService: MarksService) {}

  // MARKS CRUD ENDPOINTS ---- MARKS CRUD ENDPOINTS ---- MARKS CRUD ENDPOINTS ---- MARKS CRUD ENDPOINTS ---- MARKS CRUD ENDPOINTS
  createMarkWithCourseStudentLectorIds(
    createMarkDto: CreateMarkDto,
  ): Promise<MarkDto> {
    return this.marksService.createMarkWithCourseStudentLectorIds(
      createMarkDto,
    );
  }

  getAllMarks(queryFilter: QueryFilterDto): Promise<MarkDto[]> {
    return this.marksService.getAllMarks(queryFilter);
  }

  getMarkById(id: string): Promise<MarkDto> {
    return this.marksService.getMarkById(id);
  }

  updateMark(id: string, updateMarkDto: UpdateMarkDto): Promise<MarkDto> {
    return this.marksService.updateMark(id, updateMarkDto);
  }

  removeMark(id: string): Promise<MarkDto> {
    return this.marksService.removeMark(id);
  }
  // MARKS CRUD ENDPOINTS ---- MARKS CRUD ENDPOINTS ---- MARKS CRUD ENDPOINTS ---- MARKS CRUD ENDPOINTS ---- MARKS CRUD ENDPOINTS

  // MARKS OTHER ENDPOINTS ---- MARKS OTHER ENDPOINTS ---- MARKS OTHER ENDPOINTS ---- MARKS OTHER ENDPOINTS ---- MARKS OTHER ENDPOINTS
  getMarksByStudentIdWithCourseName(
    id: string,
  ): Promise<MarkWithCourseNameDto[]> {
    return this.marksService.getMarksByStudentIdWithCourseName(id);
  }

  getMarksByCourseIdWithCourseLectorStudentNames(
    id: string,
  ): Promise<MarkWithCourseLectorStudentNamesDto[]> {
    return this.marksService.getMarksByCourseIdWithCourseLectorStudentNames(id);
  }
  // MARKS OTHER ENDPOINTS ---- MARKS OTHER ENDPOINTS ---- MARKS OTHER ENDPOINTS ---- MARKS OTHER ENDPOINTS ---- MARKS OTHER ENDPOINTS
}
