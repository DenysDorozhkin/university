import { IsNumberString, IsString, IsNotEmpty, IsEnum } from 'class-validator';
import { AppEnvs } from '../../application/enums';

export class ConfigDto {
  @IsNotEmpty()
  @IsString()
  @IsEnum(AppEnvs)
  APP_ENV: AppEnvs;

  @IsNotEmpty()
  @IsNumberString()
  APP_PORT: number;

  @IsNotEmpty()
  @IsNumberString()
  DATABASE_PORT: number;

  @IsNotEmpty()
  @IsString()
  DATABASE_HOST: string;

  @IsNotEmpty()
  @IsString()
  DATABASE_USER: string;

  @IsNotEmpty()
  @IsString()
  DATABASE_PASSWORD: string;

  @IsNotEmpty()
  @IsString()
  DATABASE_NAME: string;

  @IsNotEmpty()
  @IsString()
  JWT_ACCESS_SECRET: string;

  @IsNotEmpty()
  @IsString()
  JWT_REFRESH_SECRET: string;

  @IsNotEmpty()
  @IsString()
  SMTP_HOST: string;

  @IsNotEmpty()
  @IsNumberString()
  SMTP_PORT: number;

  @IsNotEmpty()
  @IsString()
  SMTP_USER: string;

  @IsNotEmpty()
  @IsString()
  SMTP_PASSWORD: string;

  @IsNotEmpty()
  @IsString()
  CLIENT_URL: string;

  @IsNotEmpty()
  @IsString()
  UPLOADED_FILES_DESTINATION: string;
}
