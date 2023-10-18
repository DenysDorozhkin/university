import { Module } from '@nestjs/common';
import { MarksService } from './marks.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Mark } from './entities/mark.entity';
import { StudentsModule } from '../students/students.module';
import { CoursesModule } from '../courses/courses.module';
import { LectorsModule } from '../lectors/lectors.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Mark]),
    StudentsModule,
    CoursesModule,
    LectorsModule,
  ],
  providers: [MarksService],
  exports: [MarksService],
})
export class MarksModule {}
