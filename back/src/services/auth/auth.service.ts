import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { ResetTokenService } from '../reset-tokens/reset-token.service';
import { SignResponseDto } from '../../controllers/auth/dto/sign.response.dto';
import { SignRequestDto } from 'src/controllers/auth/dto/sign.request.dto';
import { LectorsService } from '../lectors/lectors.service';
import { CreateResetPasswordRequestDto } from 'src/controllers/auth/dto/create-reset-password-request.request.dto';
// import { jwtConstants } from 'src/application/constants/auth.constants';
import { CreateResetPasswordDto } from '../../controllers/auth/dto/create-reset-password.request.dto';
import { MailerService } from '../mailer/mailer.service';
import { ResetPasswordDto } from 'src/controllers/auth/dto/reset-password.response.dto';
import { Response } from 'express';

@Injectable()
export class AuthService {
  constructor(
    private resetTokenService: ResetTokenService,
    private readonly lectorsService: LectorsService,
    private readonly jwtService: JwtService,
    private readonly mailerService: MailerService,
  ) {}

  // AUTH CONTROLLER METHODS ---- AUTH CONTROLLER METHODS ---- AUTH CONTROLLER METHODS ---- AUTH CONTROLLER METHODS ---- AUTH CONTROLLER METHODS
  async signUp(
    signUpDto: SignRequestDto,
    response: Response,
  ): Promise<SignResponseDto> {
    await this.lectorsService.createLector(signUpDto);

    const { refreshToken, accessToken } = await this.issueTokens(
      signUpDto.email,
    );

    response.cookie('refresh-token', refreshToken, {
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      sameSite: 'none',
      secure: true,
    });

    return { accessToken };
  }

  async signIn(
    signInDto: SignRequestDto,
    response: Response,
  ): Promise<SignResponseDto> {
    const { email, password } = signInDto;
    const user = await this.lectorsService.getLectorByEmail(email);
    if (!user) throw new UnauthorizedException('Invalid email or password');

    const isValidPassword = bcrypt.compareSync(password, user.password);
    if (!isValidPassword)
      throw new UnauthorizedException('Invalid email or password');

    const { refreshToken, accessToken } = await this.issueTokens(
      signInDto.email,
    );

    response.cookie('refresh-token', refreshToken, {
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      sameSite: 'none',
      secure: true,
    });

    return { accessToken };
  }

  async refreshTokens(
    refreshToken: string,
    response: Response,
  ): Promise<SignResponseDto> {
    const payload = await this.jwtService.verifyAsync(refreshToken, {
      secret: process.env.JWT_REFRESH_SECRET,
    });
    if (!payload) throw new UnauthorizedException('Invalid credentials');

    try {
      await this.lectorsService.getLectorByEmail(payload.userEmail);
    } catch (err) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const newTokens = await this.issueTokens(payload.userEmail);

    response.cookie('refresh-token', newTokens.refreshToken, {
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      sameSite: 'none',
      secure: true,
    });

    return { accessToken: newTokens.accessToken };
  }

  async resetPasswordRequest(
    dto: CreateResetPasswordRequestDto,
  ): Promise<ResetPasswordDto> {
    const { email } = dto;
    const user = await this.lectorsService.getLectorByEmail(email);
    if (!user) {
      throw new BadRequestException(
        `Cannot generate token for reset password request because user with email: ${email} is not found`,
      );
    }
    const { token } = await this.resetTokenService.generateResetToken(user);

    await this.mailerService.sendResetPasswordMail(
      email,
      `${process.env.CLIENT_URL}/reset-password?token=${token}&email=${email}`,
    );

    return { email, message: 'Success' };
  }

  async resetPassword(dto: CreateResetPasswordDto): Promise<ResetPasswordDto> {
    const { token, email, password } = dto;

    const user = await this.lectorsService.getLectorByEmail(email);
    if (!user) {
      throw new NotFoundException(`User with email: ${email} is not found`);
    }

    const userWithResetToken =
      await this.lectorsService.getLectorByIdWithResetToken(user.id);

    if (!userWithResetToken.resetToken) {
      throw new BadRequestException(
        `There is no reset password request for user: ${email}`,
      );
    }

    const resetPasswordToken = await this.resetTokenService.getResetTokenById(
      userWithResetToken.resetToken.id,
    );

    if (token !== resetPasswordToken.token)
      throw new BadRequestException('Invalid reset token');

    await this.lectorsService.updateLectorPassword(user.id, password);
    await this.resetTokenService.removeResetToken(
      userWithResetToken.resetToken.id,
    );

    return { email, message: 'Success' };
  }
  // AUTH CONTROLLER METHODS ---- AUTH CONTROLLER METHODS ---- AUTH CONTROLLER METHODS ---- AUTH CONTROLLER METHODS ---- AUTH CONTROLLER METHODS

  // AUTH OTHER METHODS ---- AUTH OTHER METHODS ---- AUTH OTHER METHODS ---- AUTH OTHER METHODS ---- AUTH OTHER METHODS
  async issueTokens(userEmail: string) {
    const payload = { userEmail };

    const accessToken = await this.jwtService.signAsync(payload, {
      expiresIn: '1h',
      secret: process.env.JWT_ACCESS_SECRET,
    });

    const refreshToken = await this.jwtService.signAsync(payload, {
      expiresIn: '7d',
      secret: process.env.JWT_REFRESH_SECRET,
    });

    return { accessToken, refreshToken };
  }
  // AUTH OTHER METHODS ---- AUTH OTHER METHODS ---- AUTH OTHER METHODS ---- AUTH OTHER METHODS ---- AUTH OTHER METHODS
}
