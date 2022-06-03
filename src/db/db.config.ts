import { ConfigType, registerAs } from '@nestjs/config';

export const DatabaseConfig = registerAs('db', () => ({
  databaseUrl: process.env.DATABASE_URL ?? '',
  authDatabaseUrl: process.env.AUTH_DATABASE_URL ?? '',
}));

export type DatabaseConfigType = ConfigType<typeof DatabaseConfig>;
