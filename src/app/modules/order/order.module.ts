import { Module } from '@nestjs/common';

import { OrderController } from '@app/controllers/order';
import { OrderServiceModule } from '@app/modules/order';
import { JWTGuard, RoleGuard } from '@app/guards';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomerRepository } from '@app/repositories/customer';
import { SpecialistRepository } from '@app/repositories/specialist';

@Module({
  imports: [OrderServiceModule, TypeOrmModule.forFeature([CustomerRepository, SpecialistRepository])],
  controllers: [OrderController],
  providers: [JWTGuard, RoleGuard]
})
export class OrderModule {}
