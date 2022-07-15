import { AuthConfig, AuthConfigType } from '@app/auth/auth.config';
import { AuthService } from '@app/auth/auth.service';
import { TenantService } from '@app/tenant/tenant.service';
import { Inject, Injectable } from '@nestjs/common';
import { ContextIdFactory, ModuleRef } from '@nestjs/core';
import { PassportStrategy } from '@nestjs/passport';
import { JwtPayload } from 'jsonwebtoken';
import { ExtractJwt, Strategy, StrategyOptions } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    @Inject(AuthConfig.KEY) authConfig: AuthConfigType,
    private authService: AuthService,
    private moduleRef: ModuleRef,
  ) {
    const config: StrategyOptions = {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKeyProvider: async (request, token, done) => {
        const contextId = ContextIdFactory.getByRequest(request);
        const tenantService = await this.moduleRef.resolve(
          TenantService,
          contextId,
        );
        console.log(tenantService);
        done(null, authConfig.jwtSecret);
      },
    };

    super(config);
  }

  async validate(payload: JwtPayload) {
    return this.authService.login(payload);
  }
}
