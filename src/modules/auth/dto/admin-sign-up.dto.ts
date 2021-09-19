import {
  IsDefined,
  IsEmail,
  IsNotEmpty,
  IsNumberString,
  IsString,
} from 'class-validator';
export class AdminSignUpDto {
  @IsNotEmpty()
  @IsDefined()
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsDefined()
  @IsString()
  password: string;

  @IsNotEmpty()
  @IsDefined()
  @IsString()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsNumberString()
  phoneNumber: string;
}
