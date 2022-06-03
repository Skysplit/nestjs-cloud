import { DatabaseConfig, DatabaseConfigType } from '@app/db/db.config';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    MikroOrmModule.forRootAsync({
      imports: [ConfigModule.forFeature(DatabaseConfig)],
      inject: [DatabaseConfig.KEY],
      useFactory(config: DatabaseConfigType) {
        return {
          type: 'postgresql',
          entities: ['./dist/**/*.entity.js'],
          entitiesTs: ['./src/**/*.entity.ts'],
          registerRequestContext: false,
          clientUrl: config.databaseUrl,
        };
      },
    }),
    MikroOrmModule.forMiddleware(),
  ],
})
export class DbModule {}
