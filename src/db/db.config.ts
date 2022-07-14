import { ConfigType, registerAs } from '@nestjs/config';
import path from 'path';
import { DataSourceOptions } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

export const databaseConfig = registerAs('db', () => ({
  databaseUrl: process.env.DATABASE_URL ?? '',
}));

export type DatabaseConfigType = ConfigType<typeof databaseConfig>;

export const makeDatabaseConfig = (
  config: DatabaseConfigType,
): DataSourceOptions => {
  const { databaseUrl } = config;

  return {
    type: 'postgres',
    url: databaseUrl,
    entities: [path.join(__dirname, '..', '**', '*.entity.{ts,js}')],
    migrations: [path.join(__dirname, 'migrations/*.{j,t}s')],
    namingStrategy: new SnakeNamingStrategy(),
  };
};
