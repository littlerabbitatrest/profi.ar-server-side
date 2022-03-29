import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CustomerRepository } from '@app/repositories/customer';
import { CustomerService } from '@app/services/customer';

@Module({
  imports: [TypeOrmModule.forFeature([CustomerRepository])],
  providers: [CustomerService],
  exports: [TypeOrmModule.forFeature([CustomerRepository]), CustomerService]
})
export class CustomerServiceModule {}
