import { Module } from '@nestjs/common';
import { StudentsControllerService } from './students.controller.service';
import { StudentsController } from './students.controller';
import { StudentsModule } from '../../services/students/students.module';

@Module({
  imports: [StudentsModule],
  controllers: [StudentsController],
  providers: [StudentsControllerService],
})
export class StudentsControllerModule {}
