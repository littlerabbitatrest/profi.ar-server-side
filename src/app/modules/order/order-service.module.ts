import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { OrderRepository } from '@app/repositories/order';
import { OrderService } from '@app/services/order';
import { CustomerServiceModule } from '@app/modules/customer';
import { VacancyServiceModule } from '@app/modules/vacancy';
import { ScopeServiceModule } from '@app/modules/scope';
import { CategoryServiceModule } from '@app/modules/category';

@Module({
  imports: [
    TypeOrmModule.forFeature([OrderRepository]),
    CustomerServiceModule,
    CategoryServiceModule,
    ScopeServiceModule,
    VacancyServiceModule
  ],
  providers: [OrderService],
  exports: [TypeOrmModule.forFeature([OrderRepository]), OrderService]
})
export class OrderServiceModule {}
