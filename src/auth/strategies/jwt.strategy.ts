import { AuthConfig, AuthConfigType } from '@app/auth/auth.config';
import { AuthService } from '@app/auth/auth.service';
import { Inject, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { JwtPayload } from 'jsonwebtoken';
import { ExtractJwt, Strategy, StrategyOptions } from 'passport-jwt';

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

  async validate(payload: JwtPayload) {
    return this.authService.login(payload);
  }
}
