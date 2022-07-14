import { ContextIdFactory, NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app.module';
import { TenantStrategy } from './tenant/tentant.strategy';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: '*',
  });

  const config = new DocumentBuilder()
    .setTitle('Todo app')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('apidocs', app, document);

  ContextIdFactory.apply(new TenantStrategy());

  await app.listen(process.env.PORT ?? 4000);
}

bootstrap();
