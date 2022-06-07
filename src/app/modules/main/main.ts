import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule } from '@nestjs/swagger';
import { NestFactory } from '@nestjs/core';

import { AppModule } from '@app/modules/main';
import { swaggerApi } from '@src/api';
import { HttpExceptionFilter } from '@app/filters';
import { LoggingInterceptor } from '@app/interceptors';

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
  SwaggerModule.setup('api', app, swaggerApi);
  app.useGlobalInterceptors(new LoggingInterceptor);
  app.useGlobalFilters(new HttpExceptionFilter);

  await app.listen(3000, '0.0.0.0');
};
bootstrap().then();
