import { Injectable } from '@nestjs/common';
import { StudentsService } from '../../services/students/students.service';
import { CreateStudentDto } from './dto/crud/create-student.request.dto';
import { UpdateStudentDto } from './dto/crud/update-student.request.dto';
import { QueryFilterDto } from 'src/application/dto/query.filter.dto';
import { StudentDto } from './dto/crud/student.response.dto';
import { StudentWithGroupNameDto } from './dto/other/student-with-group-name.response.dto';
import { NameFilterDto } from './dto/other/name.filter.dto';
import { StudentAvatarDto } from './dto/other/student-avatar.dto';
import { ReturnStudentAvatarDto } from './dto/other/student-avatar.response.dto';
import { StudentWithCoursesDto } from './dto/other/student-with-courses.dto';

@Injectable()
export class StudentsControllerService {
  constructor(private readonly studentsService: StudentsService) {}

  // STUDENTS CRUD ENDPOINTS ---- STUDENTS CRUD ENDPOINTS ---- STUDENTS CRUD ENDPOINTS ---- STUDENTS CRUD ENDPOINTS ---- STUDENTS CRUD ENDPOINTS
  createStudent(createStudentDto: CreateStudentDto): Promise<StudentDto> {
    return this.studentsService.createStudent(createStudentDto);
  }

  getAllStudents(queryFilter: QueryFilterDto): Promise<StudentDto[]> {
    return this.studentsService.getAllStudents(queryFilter);
  }

  getStudentById(id: string): Promise<StudentDto> {
    return this.studentsService.getStudentById(id);
  }

  updateStudent(
    id: string,
    updateStudentDto: UpdateStudentDto,
  ): Promise<StudentDto> {
    return this.studentsService.updateStudent(id, updateStudentDto);
  }

  removeStudent(id: string): Promise<StudentDto> {
    return this.studentsService.removeStudent(id);
  }
  // STUDENTS CRUD ENDPOINTS ---- STUDENTS CRUD ENDPOINTS ---- STUDENTS CRUD ENDPOINTS ---- STUDENTS CRUD ENDPOINTS ---- STUDENTS CRUD ENDPOINTS

  // STUDENTS OTHER ENDPOINTS ---- STUDENTS OTHER ENDPOINTS ---- STUDENTS OTHER ENDPOINTS ---- STUDENTS OTHER ENDPOINTS ---- STUDENTS OTHER ENDPOINTS
  getStudentsWithGroupName(
    nameFilter: NameFilterDto,
  ): Promise<StudentWithGroupNameDto[]> {
    return this.studentsService.getStudentsWithGroupName(nameFilter);
  }

  getStudentsWithCourses(
    nameFilter: NameFilterDto,
  ): Promise<StudentWithCoursesDto[]> {
    return this.studentsService.getStudentsWithCourses(nameFilter);
  }

  getStudentByIdWithGroupName(id: string): Promise<StudentWithGroupNameDto> {
    return this.studentsService.getStudentByIdWithGroupName(id);
  }

  updateStudentAvatar(
    id: string,
    avatar: StudentAvatarDto,
  ): Promise<StudentDto> {
    return this.studentsService.updateStudentAvatar(id, avatar);
  }

  getStudentAvatarById(id: string): Promise<ReturnStudentAvatarDto> {
    return this.studentsService.getStudentAvatarById(id);
  }
  // STUDENTS OTHER ENDPOINTS ---- STUDENTS OTHER ENDPOINTS ---- STUDENTS OTHER ENDPOINTS ---- STUDENTS OTHER ENDPOINTS ---- STUDENTS OTHER ENDPOINTS
}
