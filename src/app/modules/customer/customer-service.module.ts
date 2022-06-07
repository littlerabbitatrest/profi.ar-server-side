import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CustomerRepository } from '@app/repositories/customer';
import { CustomerService } from '@app/services/customer';
import { LocationServiceModule } from '../location';

@Module({
  imports: [TypeOrmModule.forFeature([CustomerRepository]), LocationServiceModule],
  providers: [CustomerService],
  exports: [TypeOrmModule.forFeature([CustomerRepository]), CustomerService]
})
export class CustomerServiceModule {}
