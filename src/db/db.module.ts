import {
  databaseConfig,
  DatabaseConfigType,
  makeDatabaseConfig,
} from '@app/db/db.config';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule.forFeature(databaseConfig)],
      inject: [databaseConfig.KEY],
      useFactory(config: DatabaseConfigType) {
        return makeDatabaseConfig(config);
      },
    }),
  ],
})
export class DbModule {}
