import {
  Body,
  Controller,
  Post,
  HttpCode,
  HttpStatus,
  Res,
  UnauthorizedException,
  Get,
} from '@nestjs/common';
import { Response } from 'express';
import { SignRequestDto } from './dto/sign.request.dto';
import { SignResponseDto } from './dto/sign.response.dto';
import { AuthControllerService } from './auth.controller.service';
import { CreateResetPasswordRequestDto } from './dto/create-reset-password-request.request.dto';
import { CreateResetPasswordDto } from './dto/create-reset-password.request.dto';
import { ResetPasswordDto } from './dto/reset-password.response.dto';
import { Cookies } from 'src/services/auth/decorators/cookies.decorator';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { MessageResponseDto } from './dto/message.response.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authControllerService: AuthControllerService) {}

  @ApiOperation({ summary: 'Sign up' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    type: SignResponseDto,
    description: 'Returns access token',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Lector with this email already exists',
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Something went wrong',
  })
  @ApiResponse({
    status: HttpStatus.HTTP_VERSION_NOT_SUPPORTED,
    description: 'HTTP Version Not Supported',
  })
  @Post('sign-up')
  async signUp(
    @Body() signUpDto: SignRequestDto,
    @Res({ passthrough: true }) response: Response,
  ): Promise<SignResponseDto> {
    return this.authControllerService.signUp(signUpDto, response);
  }

  @ApiOperation({ summary: 'Sign in' })
  @ApiResponse({
    status: HttpStatus.OK,
    type: SignResponseDto,
    description: 'Returns access token',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Invalid email or password',
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Something went wrong',
  })
  @ApiResponse({
    status: HttpStatus.HTTP_VERSION_NOT_SUPPORTED,
    description: 'HTTP Version Not Supported',
  })
  @HttpCode(HttpStatus.OK)
  @Post('sign-in')
  async signIn(
    @Body() signInDto: SignRequestDto,
    @Res({ passthrough: true }) response: Response,
  ): Promise<SignResponseDto> {
    return this.authControllerService.signIn(signInDto, response);
  }

  @ApiOperation({ summary: 'Refresh access token' })
  @ApiResponse({
    status: HttpStatus.OK,
    type: SignResponseDto,
    description: 'Returns access token',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Invalid credentials',
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Something went wrong',
  })
  @ApiResponse({
    status: HttpStatus.HTTP_VERSION_NOT_SUPPORTED,
    description: 'HTTP Version Not Supported',
  })
  @Get('refresh')
  refreshTokens(
    @Cookies('refresh-token') refreshToken: string,
    @Res({ passthrough: true }) response: Response,
  ): Promise<SignResponseDto> {
    if (!refreshToken) throw new UnauthorizedException('Invalid credentials');

    return this.authControllerService.refreshTokens(refreshToken, response);
  }

  @ApiOperation({ summary: 'Reset password request' })
  @ApiResponse({
    status: HttpStatus.OK,
    type: ResetPasswordDto,
    description:
      "Password reset request successfully accepted and email with link to reset password sent to mailbox (returns user email and message: 'Success')",
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description:
      'Cannot generate token for reset password request because user with this email is not found; This user already has reset token',
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Something went wrong',
  })
  @ApiResponse({
    status: HttpStatus.HTTP_VERSION_NOT_SUPPORTED,
    description: 'HTTP Version Not Supported',
  })
  @HttpCode(HttpStatus.OK)
  @Post('reset-password-request')
  resetPasswordRequest(
    @Body() createResetPasswordRequestDto: CreateResetPasswordRequestDto,
  ): Promise<ResetPasswordDto> {
    return this.authControllerService.resetPasswordRequest(
      createResetPasswordRequestDto,
    );
  }

  @ApiOperation({ summary: 'Reset password' })
  @ApiResponse({
    status: HttpStatus.OK,
    type: ResetPasswordDto,
    description:
      "Password reset successfully accepted (returns user email and message: 'Success')",
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description:
      'There is no reset password request for this user; Invalid reset token',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'User with this email is not found',
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Something went wrong',
  })
  @ApiResponse({
    status: HttpStatus.HTTP_VERSION_NOT_SUPPORTED,
    description: 'HTTP Version Not Supported',
  })
  @HttpCode(HttpStatus.OK)
  @Post('reset-password')
  resetPassword(
    @Body() createResetPasswordDto: CreateResetPasswordDto,
  ): Promise<ResetPasswordDto> {
    return this.authControllerService.resetPassword(createResetPasswordDto);
  }

  @ApiOperation({ summary: 'Log out' })
  @ApiResponse({
    status: HttpStatus.OK,
    type: MessageResponseDto,
    description: "Clears refresh token (returns message: 'Success')",
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Something went wrong',
  })
  @ApiResponse({
    status: HttpStatus.HTTP_VERSION_NOT_SUPPORTED,
    description: 'HTTP Version Not Supported',
  })
  @Get('logout')
  logout(@Res({ passthrough: true }) response: Response): MessageResponseDto {
    response.clearCookie('refresh-token');

    return { message: 'Success' };
  }
}
