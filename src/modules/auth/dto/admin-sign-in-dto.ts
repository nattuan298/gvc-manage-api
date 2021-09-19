import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class AdminSignInDto {
  @ApiProperty()
  @IsDefined()
  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  username: string;

  @IsString()
  @IsDefined()
  @ApiProperty()
  @IsNotEmpty()
  @MinLength(1)
  password: string;
}
