import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from 'src/users/users.module';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { AccessTokenStrategy, RefreshTokenStrategy } from './strategies';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [JwtModule.register({}), UsersModule, ConfigModule],
  controllers: [AuthController],
  providers: [AuthService, AccessTokenStrategy, RefreshTokenStrategy],
})
export class AuthModule {}
