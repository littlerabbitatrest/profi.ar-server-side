import { Module } from '@nestjs/common';

import { ManController } from '@app/controllers/man';
import { ManServiceModule } from '@app/modules/man';

@Module({
  imports: [ManServiceModule],
  providers: [],
  controllers: [ManController]
})
export class ManModule {}
