import { Module } from '@nestjs/common';
import { GroupsController } from './groups.controller';
import { GroupsModule } from '../../services/groups/groups.module';
import { GroupsControllerService } from './groups.controller.service';

@Module({
  imports: [GroupsModule],
  controllers: [GroupsController],
  providers: [GroupsControllerService],
})
export class GroupsControllerModule {}
