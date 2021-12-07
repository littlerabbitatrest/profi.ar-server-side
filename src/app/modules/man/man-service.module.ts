import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

import { ManRepository } from '@app/repositories/man';
import { ManService } from '@app/services/man';

@Module({
  imports: [TypeOrmModule.forFeature([ManRepository])],
  providers: [ManService],
  exports: [ManService, TypeOrmModule.forFeature([ManRepository])]
})
export class ManServiceModule {}
