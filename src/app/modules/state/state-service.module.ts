import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { StateRepository } from '@app/repositories/state';
import { StateService } from '@app/services/state';

@Module({
  imports: [TypeOrmModule.forFeature([StateRepository])],
  providers: [StateService],
  exports: [TypeOrmModule.forFeature([StateRepository]), StateService]
})
export class StateServiceModule {}
