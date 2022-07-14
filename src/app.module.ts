import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AuthModule } from './auth/auth.module';
import { DbModule } from './db/db.module';
import { TodoModule } from './todo/todo.module';
import { UserModule } from './user/user.module';
import { TenantModule } from './tenant/tenant.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
    }),
    DbModule,
    AuthModule,
    UserModule,
    TodoModule,
    TenantModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
