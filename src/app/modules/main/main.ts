import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule } from '@nestjs/swagger';
import { NestFactory } from '@nestjs/core';

import { AppModule } from '@app/modules/main';
import { swaggerApi } from '@src/api';

const bootstrap = async() => {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter,
    { bufferLogs: true }
  );
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true
    })
  );
  app.enableCors();
  app.setGlobalPrefix('api/v1');
  SwaggerModule.setup('api', app, swaggerApi);

  await app.listen(3000, '0.0.0.0');
};
bootstrap().then();
