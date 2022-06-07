import { Module } from '@nestjs/common';

import { CustomerController } from '@app/controllers/customer';
import { CustomerServiceModule } from '@app/modules/customer';
import { JWTGuard, RoleGuard } from '@app/guards';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomerRepository } from '@app/repositories/customer';
import { SpecialistRepository } from '@app/repositories/specialist';

@Module({
  imports: [CustomerServiceModule, TypeOrmModule.forFeature([CustomerRepository, SpecialistRepository])],
  controllers: [CustomerController],
  providers: [JWTGuard, RoleGuard]
})
export class CustomerModule {}
