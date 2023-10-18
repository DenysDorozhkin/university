import { Module } from '@nestjs/common';
import { LectorsManagerService } from './lectors-manager.service';
import { Course } from '../courses/entities/course.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Course])],
  providers: [LectorsManagerService],
  exports: [LectorsManagerService],
})
export class LectorsManagerModule {}
