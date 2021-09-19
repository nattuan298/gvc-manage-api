import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateRequest, Status } from 'src/common/common.constants';
import { UsersService } from '../users/users.service';
import { UserSignInResponseMessage } from './auth.constant';
import { JwtService } from '@nestjs/jwt';
import { UserSignInDto } from './dto/user-sign-in.dto';
import { UserSignUpDto } from './dto/user-sign-up.dto';
import IJwtPayload from './payloads/jwt-payload';
@Injectable()
export class AuthUserService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async userSignUp(userSignUpDto: UserSignUpDto) {
    return await this.usersService.userSignUp(userSignUpDto);
  }

  async userSingIn(userSignInDto: UserSignInDto) {
    const { username, password } = userSignInDto;
    const user = await this.usersService.getUserByUsername(username);
    if (user) {
      if (user.createRequest === CreateRequest.Wait) {
        throw new BadRequestException(UserSignInResponseMessage.Waiting);
      }
      if (user.createRequest === CreateRequest.Reject) {
        throw new BadRequestException(UserSignInResponseMessage.Reject);
      }
      // if (user.status === Status.InActive) {
      //   throw new BadRequestException(UserSignInResponseMessage.Verify);
      // }
      if (user.createRequest === CreateRequest.Approve) {
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
          const { _id, firstName, lastName, email, username } = user;
          return {
            jwtAccessToken,
            user: {
              _id,
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
      UserSignInResponseMessage.Invalid_Credentials,
    );
  }
}