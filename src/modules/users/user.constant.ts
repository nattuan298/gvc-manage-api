export enum UserResponseMessage {
  AlreadyExist = `Username already existed.`,
  NotFound = `User is not found.`,
  InvalidPassword = `Invalid password.`,
  CanNotChangePassword = `You cannot change password.`,
  VerifyEmailFail = `Cannot verify your account. Please try to verify again.`,
  VerifyEmailSuccess = `Successfully verified.`,
  Verified = `Your account has been verified`,
}
