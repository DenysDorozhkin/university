import { Module } from '@nestjs/common';
import { CoursesController } from './courses.controller';
import { CoursesControllerService } from './courses.controller.service';
import { CoursesModule } from '../../services/courses/courses.module';

@Module({
  imports: [CoursesModule],
  controllers: [CoursesController],
  providers: [CoursesControllerService],
})
export class CoursesControllerModule {}
