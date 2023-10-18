import { Module } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Course } from './entities/course.entity';
import { LectorsModule } from '../lectors/lectors.module';
import { StudentsModule } from '../students/students.module';

@Module({
  imports: [TypeOrmModule.forFeature([Course]), LectorsModule, StudentsModule],
  providers: [CoursesService],
  exports: [CoursesService],
})
export class CoursesModule {}
