/** TypeORM CLI */
import * as dotenv from 'dotenv';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { readFileSync } from 'fs';
import { env } from 'process';

dotenv.config();

export const ormConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: env.TYPEORM_HOST,
  schema: env.TYPEORM_SCHEMA,
  port: parseInt(env.TYPEORM_PORT, 10),
  username: env.TYPEORM_USERNAME,
  password: env.TYPEORM_PASSWORD,
  database: env.TYPEORM_DATABASE,

  ssl: {
    rejectUnauthorized: true,
    ca: readFileSync('./certs/root.crt')
  },

  logging: Number(env.TYPEORM_MODE) ? 'all' : ['warn', 'error', 'log'],
  entities: [`${__dirname}/**/*.entity{.ts,.js}`],

  /**
   * Когда используются миграции, синхронизация должна быть отключена
   * 1 - true
   * 0 - false
   */
  synchronize: Boolean(Number(env.TYPEORM_SYNCHRONIZE)),
  /** Можно отключить автозапуск миграций, если нужен ручной контроль */
  migrationsRun: false,
  verboseRetryLog: true,
  retryAttempts: Number(Infinity),
  retryDelay: 3000
};
