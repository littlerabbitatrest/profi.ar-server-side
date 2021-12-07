import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

import { ManModule } from '@app/modules/man';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    ManModule
  ]
})
export class AppModule {}
