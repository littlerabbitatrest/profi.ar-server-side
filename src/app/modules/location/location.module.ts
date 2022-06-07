import { Module } from '@nestjs/common';

import { LocationController } from '@app/controllers/location';
import { LocationServiceModule } from '@app/modules/location';
import { JWTGuard, RoleGuard } from '@app/guards';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomerRepository } from '@app/repositories/customer';
import { SpecialistRepository } from '@app/repositories/specialist';

@Module({
  imports: [LocationServiceModule, TypeOrmModule.forFeature([CustomerRepository, SpecialistRepository])],
  controllers: [LocationController],
  providers: [JWTGuard, RoleGuard]
})
export class LocationModule {}
