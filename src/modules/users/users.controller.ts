import { Controller, Get, Body, Param, Put, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CommonIdParams } from 'src/common/common.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';

@ApiTags('users')
@ApiBearerAuth()
@UseGuards(AuthGuard('verifyUser'))
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get(':id')
  findOne(@Param() commonIdParams: CommonIdParams) {
    return this.usersService.findOne(commonIdParams.id);
  }

  @Put(':id')
  update(
    @Param() commonIdParams: CommonIdParams,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    this.usersService.update(commonIdParams.id, updateUserDto);
  }
}
