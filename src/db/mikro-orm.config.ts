import 'dotenv/config';

import { Options } from '@mikro-orm/core';

const config: Options = {
  type: 'postgresql',
  name: 'default',
  entities: ['dist/**/*.entity.js', 'dist/user/user.entity.js'],
  entitiesTs: ['src/**/*.entity.ts', 'src/user/user.entity.ts'],
  clientUrl: process.env.DATABASE_URL,
  schema: 'public',
  migrations: {
    path: './dist/db/migrations',
    pathTs: './src/db/migrations',
    disableForeignKeys: false,
  },
};

export default config;
