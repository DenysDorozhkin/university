import { Module } from '@nestjs/common';
import { MarksModule } from 'src/services/marks/marks.module';
import { MarksController } from './marks.controller';
import { MarksControllerService } from './marks.controller.service';

@Module({
  imports: [MarksModule],
  controllers: [MarksController],
  providers: [MarksControllerService],
})
export class MarksControllerModule {}
