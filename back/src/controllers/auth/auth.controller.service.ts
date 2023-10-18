import { Injectable } from '@nestjs/common';
import { AuthService } from 'src/services/auth/auth.service';
import { SignRequestDto } from './dto/sign.request.dto';
import { SignResponseDto } from './dto/sign.response.dto';
import { CreateResetPasswordRequestDto } from './dto/create-reset-password-request.request.dto';
import { ResetPasswordDto } from './dto/reset-password.response.dto';
import { CreateResetPasswordDto } from './dto/create-reset-password.request.dto';
import { Response } from 'express';

@Injectable()
export class AuthControllerService {
  constructor(private readonly authService: AuthService) {}

  signUp(
    signUpDto: SignRequestDto,
    response: Response,
  ): Promise<SignResponseDto> {
    return this.authService.signUp(signUpDto, response);
  }

  signIn(
    signInDto: SignRequestDto,
    response: Response,
  ): Promise<SignResponseDto> {
    return this.authService.signIn(signInDto, response);
  }

  refreshTokens(
    refreshToken: string,
    response: Response,
  ): Promise<SignResponseDto> {
    return this.authService.refreshTokens(refreshToken, response);
  }

  resetPasswordRequest(
    createResetPasswordRequestDto: CreateResetPasswordRequestDto,
  ): Promise<ResetPasswordDto> {
    return this.authService.resetPasswordRequest(createResetPasswordRequestDto);
  }

  public resetPassword(
    createResetPasswordDto: CreateResetPasswordDto,
  ): Promise<ResetPasswordDto> {
    return this.authService.resetPassword(createResetPasswordDto);
  }

  // logout() {
  //   return this.authService.logout();
  // }
}
