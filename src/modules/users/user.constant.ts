export enum UserResponseMessage {
  AlreadyExist = `Username or Email already existed.`,
  NotFound = `User is not found.`,
  InvalidPassword = `Invalid password.`,
  CanNotChangePassword = `You cannot change password.`,
  VerifyEmailFail = `Cannot verify your account. Please try to verify again.`,
  VerifyEmailSuccess = `Successfully verified.`,
  Verified = `Your account has been verified`,
}

export const defaultAvatar = `user/6bb11f3d-fc82-4f22-9c34-32af62e3248b-default-avatar.jpg`;
