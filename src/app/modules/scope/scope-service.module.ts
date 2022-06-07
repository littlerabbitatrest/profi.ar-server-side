import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ScopeRepository } from '@app/repositories/scope';
import { ScopeService } from '@app/services/scope';

@Module({
  imports: [TypeOrmModule.forFeature([ScopeRepository])],
  providers: [ScopeService],
  exports: [TypeOrmModule.forFeature([ScopeRepository]), ScopeService]
})
export class ScopeServiceModule {}
