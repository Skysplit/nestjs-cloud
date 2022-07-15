import { TenantModule } from '@app/tenant/tenant.module';
import { UserModule } from '@app/user/user.module';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AuthConfig } from './auth.config';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [ConfigModule.forFeature(AuthConfig), UserModule, TenantModule],
  providers: [JwtStrategy, AuthService],
})
export class AuthModule {}
