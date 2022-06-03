import { Inject, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { User } from '@supabase/supabase-js';
import { ExtractJwt, Strategy, StrategyOptions } from 'passport-jwt';

import { AuthConfig, AuthConfigType } from '../auth.config';
import { AuthService } from '../auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    @Inject(AuthConfig.KEY) authConfig: AuthConfigType,
    private authService: AuthService,
  ) {
    const config: StrategyOptions = {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: authConfig.jwtSecret,
    };

    super(config);
  }

  async validate(payload: User) {
    // TODO: fetch user from application database instead of supabase payload
    return payload;
  }
}
