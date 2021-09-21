import { IsEnum, IsOptional, IsString } from 'class-validator';
import { CreateRequest, Status } from 'src/common/common.constants';
import { CommonPaginationDto } from 'src/common/pagination.dto';

export class AdminFindUserDto extends CommonPaginationDto {
  @IsEnum(Status)
  @IsOptional()
  status?: Status;

  @IsEnum(CreateRequest)
  @IsOptional()
  createRequest?: CreateRequest;

  @IsString()
  @IsOptional()
  keyword?: string;
}
