import { Module } from '@nestjs/common';
import { LectorsService } from './lectors.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Lector } from './entities/lector.entity';
import { LectorsManagerModule } from '../lectors-manager/lectors-manager.module';

@Module({
  imports: [TypeOrmModule.forFeature([Lector]), LectorsManagerModule],
  providers: [LectorsService],
  exports: [LectorsService],
})
export class LectorsModule {}
