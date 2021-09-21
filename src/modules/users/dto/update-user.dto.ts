import {
  IsDateString,
  IsEmail,
  IsEnum,
  IsNumberString,
  IsOptional,
  IsString,
} from 'class-validator';
import { Gender } from 'src/common/common.constants';

export class UpdateUserDto {
  @IsString()
  @IsOptional()
  firstName: string;

  @IsOptional()
  @IsString()
  lastName: string;

  @IsOptional()
  @IsString()
  @IsEmail()
  email: string;

  @IsOptional()
  @IsNumberString()
  phoneNumber: string;

  @IsOptional()
  @IsString()
  generation: string;

  @IsOptional()
  @IsEnum(Gender)
  @IsString()
  gender: Gender;

  @IsOptional()
  @IsString()
  @IsDateString()
  dateOfBirth: Date;
}
