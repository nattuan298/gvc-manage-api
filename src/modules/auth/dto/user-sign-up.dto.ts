import {
  IsDateString,
  IsDefined,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsNumberString,
  IsString,
} from 'class-validator';
import { Gender } from 'src/common/common.constants';

export class UserSignUpDto {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

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

  @IsString()
  generation: string;

  @IsEnum(Gender)
  @IsString()
  gender: Gender;

  @IsString()
  @IsDateString()
  dateOfBirth: Date;
}