import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import IJwtPayload from '../payloads/jwt-payload';
import { UsersService } from '../../users/users.service';
import { Role, Status } from '../../../common/common.constants';

@Injectable()
export class VerifyAdminStrategy extends PassportStrategy(
  Strategy,
  'verifyAdmin',
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
    if (user.status !== Status.Active && user.role !== Role.Admin) {
      throw new UnauthorizedException();
    }
    return payload;
  }
}
