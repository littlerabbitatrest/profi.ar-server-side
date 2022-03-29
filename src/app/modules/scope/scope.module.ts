import { Module } from '@nestjs/common';

import { ScopeController } from '@app/controllers/scope';
import { ScopeServiceModule } from '@app/modules/scope';

@Module({
  imports: [ScopeServiceModule],
  controllers: [ScopeController],
  providers: []
})
export class ScopeModule {}
