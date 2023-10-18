import { Module } from '@nestjs/common';
import { LectorsController } from './lectors.controller';
import { LectorsControllerService } from './lectors.controller.service';
import { LectorsModule } from '../../services/lectors/lectors.module';

@Module({
  imports: [LectorsModule],
  controllers: [LectorsController],
  providers: [LectorsControllerService],
})
export class LectorsControllerModule {}
