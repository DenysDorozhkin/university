import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersControllerService } from './users.controller.service';
import { LectorsModule } from 'src/services/lectors/lectors.module';

@Module({
  imports: [LectorsModule],
  controllers: [UsersController],
  providers: [UsersControllerService],
})
export class UsersControllerModule {}
