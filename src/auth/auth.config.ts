import { ConfigType, registerAs } from '@nestjs/config';

export const AuthConfig = registerAs('auth', () => ({
  jwtSecret: process.env.JWT_SECRET ?? '',
}));

export type AuthConfigType = ConfigType<typeof AuthConfig>;
