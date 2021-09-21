import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateRequest, Role, Status } from 'src/common/common.constants';
import { UsersService } from '../users/users.service';
import { AdminSignInResponseMessage } from './auth.constant';
import { JwtService } from '@nestjs/jwt';
import IJwtPayload from './payloads/jwt-payload';
import { AdminSignInDto } from './dto/admin-sign-in-dto';
import { AdminSignUpDto } from './dto/admin-sign-up.dto';
@Injectable()
export class AuthAdminService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async adminSignUp(adminSignUpDto: AdminSignUpDto) {
    return await this.usersService.adminSignUp(adminSignUpDto);
  }

  async adminSingIn(adminSignInDto: AdminSignInDto) {
    const { username, password } = adminSignInDto;
    const user = await this.usersService.getUserByUsername(username);
    if (user) {
      if (
        (user.createRequest === CreateRequest.Approve,
        user.status === Status.Active && user.role === Role.Admin)
      ) {
        const checkPassword = await this.usersService.validatePassword(
          password,
          user.password,
        );
        if (checkPassword) {
          const payload: IJwtPayload = {
            email: user.email,
            username: user.username,
            role: user.role,
          };
          const jwtAccessToken = await this.jwtService.signAsync(payload);
          const { firstName, lastName, email, username } = user;
          return {
            jwtAccessToken,
            user: {
              firstName,
              lastName,
              username,
              email,
            },
          };
        }
      }
    }
    throw new BadRequestException(
      AdminSignInResponseMessage.Invalid_Credentials,
    );
  }
}
