import { Module } from '@nestjs/common';

import { SpecialistController } from '@app/controllers/specialist';
import { SpecialistServiceModule } from '@app/modules/specialist';
import { JWTGuard, RoleGuard } from '@app/guards';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomerRepository } from '@app/repositories/customer';
import { SpecialistRepository } from '@app/repositories/specialist';

@Module({
  imports: [SpecialistServiceModule, TypeOrmModule.forFeature([CustomerRepository, SpecialistRepository])],
  controllers: [SpecialistController],
  providers: [JWTGuard, RoleGuard]
})
export class SpecialistModule {}
