import {
  IsDateString,
  IsDefined,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsNumberString,
  IsString,
} from 'class-validator';
import { Gender, Generation } from 'src/common/common.constants';

export class CreateUserDto {
  @IsString()
  firstName: string;

  @IsString()
  middleName: string;

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

  @IsEnum(Generation)
  @IsString()
  generation: Generation;

  @IsEnum(Generation)
  @IsString()
  gender: Gender;

  @IsString()
  @IsDateString()
  dateOfBirth: string;
}
