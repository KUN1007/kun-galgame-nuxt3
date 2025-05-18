export interface RegisterVerificationCodeRequestData {
  name: string
  email: string
}

export interface ForgotPasswordVerificationCodeRequestData {
  email: string
}

export interface ResetPasswordByEmailRequestData {
  codeSalt: string
  email: string
  code: string
  newPassword: string
}
