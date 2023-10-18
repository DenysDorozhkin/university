import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
// import { jwtConstants } from '../../application/constants/auth.constants';
import { AuthGuard } from './guards/auth.guard';
import { ResetTokenModule } from '../reset-tokens/reset-token.module';
import { LectorsModule } from '../lectors/lectors.module';
import { MailerModule } from '../mailer/mailer.module';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: process.env.JWT_ACCESS_SECRET,
      signOptions: { expiresIn: '15m' },
    }),
    ResetTokenModule,
    LectorsModule,
    MailerModule,
  ],
  providers: [AuthService, AuthGuard],
  exports: [AuthService],
})
export class AuthModule {}
