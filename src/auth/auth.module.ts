import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AuthConfig } from './auth.config';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [ConfigModule.forFeature(AuthConfig)],
  providers: [JwtStrategy, AuthService],
})
export class AuthModule {}
