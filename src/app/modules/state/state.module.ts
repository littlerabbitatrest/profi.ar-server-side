import { Module } from '@nestjs/common';

import { StateController } from '@app/controllers/state';
import { StateServiceModule } from '@app/modules/state';

@Module({
  imports: [StateServiceModule],
  controllers: [StateController],
  providers: []
})
export class StateModule {}
