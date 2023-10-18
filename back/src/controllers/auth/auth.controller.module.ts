import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthModule } from '../../services/auth/auth.module';
import { AuthControllerService } from './auth.controller.service';

@Module({
  imports: [AuthModule],
  controllers: [AuthController],
  providers: [AuthControllerService],
})
export class AuthControllerModule {}
