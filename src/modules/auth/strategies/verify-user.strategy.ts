import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import IJwtPayload from '../payloads/jwt-payload';
import { Role, Status } from 'src/common/common.constants';
import { UsersService } from 'src/modules/users/users.service';

@Injectable()
export class VerifyUserStrategy extends PassportStrategy(
  Strategy,
  'verifyUser',
) {
  constructor(private readonly usersService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET_KEY,
    });
  }

  async validate(payload: IJwtPayload): Promise<IJwtPayload> {
    const { email, username } = payload;
    const user = await this.usersService.validateUser(email, username);
    if (!user) {
      throw new UnauthorizedException();
    }
    if (user.status !== Status.Active && user.role !== Role.User) {
      throw new UnauthorizedException();
    }
    return payload;
  }
}
