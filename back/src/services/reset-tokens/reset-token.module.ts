import { Module } from '@nestjs/common';
import { ResetTokenService } from './reset-token.service';
import { ResetToken } from './entities/reset-token.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LectorsModule } from '../lectors/lectors.module';

@Module({
  imports: [TypeOrmModule.forFeature([ResetToken]), LectorsModule],
  providers: [ResetTokenService],
  exports: [ResetTokenService],
})
export class ResetTokenModule {}
