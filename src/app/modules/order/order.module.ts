import { Module } from '@nestjs/common';

import { OrderController } from '@app/controllers/order';
import { OrderServiceModule } from '@app/modules/order';

@Module({
  imports: [OrderServiceModule],
  controllers: [OrderController],
  providers: []
})
export class OrderModule {}
