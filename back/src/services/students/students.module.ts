import { Module } from '@nestjs/common';
import { StudentsService } from './students.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Student } from './entities/student.entity';
import { GroupsModule } from '../groups/groups.module';
import { StudentAvatar } from './entities/student-avatar.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Student, StudentAvatar]), GroupsModule],
  providers: [StudentsService],
  exports: [StudentsService],
})
export class StudentsModule {}
