export interface IAuthRequest {
  email: string;
  password: string;
}

export interface IAuthResponse {
  accessToken: string;
}

export interface IForgotPasswordRequest {
  email: string;
}

export interface IForgotPasswordResponse {
  email: string;
  message: string;
}

export interface ILogoutResponse {
  message: string;
}

export interface IResetPasswordRequest extends IAuthRequest {
  token: string;
}
