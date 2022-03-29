import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { OrderRepository } from '@app/repositories/order';
import { OrderService } from '@app/services/order';

@Module({
  imports: [TypeOrmModule.forFeature([OrderRepository])],
  providers: [OrderService],
  exports: [TypeOrmModule.forFeature([OrderRepository]), OrderService]
})
export class OrderServiceModule {}
