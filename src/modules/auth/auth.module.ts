import { Module } from '@nestjs/common';
import { AuthUserService } from './auth.user.service';
import { AuthUserController } from './auth.user.controller';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthAdminService } from './auth.admin.service';
import { AdminUserController } from './auth.admin.controller';
import { VerifyAdminStrategy } from './strategies/verify-admin.strategy';
import { VerifyUserStrategy } from './strategies/verify-user.strategy';

@Module({
  imports: [
    UsersModule,
    JwtModule.registerAsync({
      useFactory: () => ({
        secret: process.env.JWT_SECRET_KEY,
        signOptions: {
          expiresIn: process.env.JWT_EXPIRES_IN,
        },
      }),
    }),
  ],
  controllers: [AuthUserController, AdminUserController],
  providers: [
    AuthUserService,
    AuthAdminService,
    VerifyAdminStrategy,
    VerifyUserStrategy,
  ],
})
export class AuthModule {}
