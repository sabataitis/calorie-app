import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserModule } from "../user/user.module";
import { PassportModule } from "@nestjs/passport";
import { LocalStrategy } from "./strategy/local.strategy";
import { JwtModule } from "@nestjs/jwt";
import { jwtConstants } from "./constants";
import { JwtStrategy } from "./strategy/jwt.strategy";
import { AuthController } from "./auth.controller";

@Module({
  controllers: [AuthController],
  imports: [
    UserModule,
    PassportModule,
    JwtModule.register({
      // TODO move to .env
      // TODO add refresh token for expiration of token
      secret: jwtConstants.secret,
      // signOptions: {expiresIn: '60m'}
    })
  ],
  providers: [
    AuthService,
    LocalStrategy,
    JwtStrategy
  ],
  exports: [AuthService]
})
export class AuthModule {}
