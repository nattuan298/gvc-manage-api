import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Put,
  SetMetadata,
  Query,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CommonIdParams } from 'src/common/common.dto';
import { RoleGuard } from 'src/common/guards/role.guard';
import { FindUserDto } from './dto/find-user.dto';
import { CreateRequestDto } from './dto/update-request.dto';
import { UsersService } from './users.service';

@ApiTags('admin')
@ApiBearerAuth()
@UseGuards(AuthGuard('verifyAdmin'), RoleGuard)
@Controller('admin')
@SetMetadata('roles', ['Admin'])
export class AdminController {
  constructor(private readonly usersService: UsersService) {}

  @Get('users')
  findAllUser(@Query() findUserDto: FindUserDto) {
    return this.usersService.findAllUser(findUserDto);
  }

  @Get('users/:id')
  findOne(@Param() commonIdParams: CommonIdParams) {
    return this.usersService.findOne(commonIdParams.id);
  }

  @Put('users/:id')
  updateRequest(
    @Param() commonIdParams: CommonIdParams,
    @Body() createRequestDto: CreateRequestDto,
  ) {
    return this.usersService.updateCreateRequest(
      commonIdParams.id,
      createRequestDto,
    );
  }

  @Delete('users/:id')
  delete(@Param() commonIdParams: CommonIdParams) {
    return this.usersService.delete(commonIdParams.id);
  }
}
