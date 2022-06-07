import { Module } from '@nestjs/common';

import { VacancyController } from '@app/controllers/vacancy';
import { VacancyServiceModule } from '@app/modules/vacancy';
import { JWTGuard, RoleGuard } from '@app/guards';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomerRepository } from '@app/repositories/customer';
import { SpecialistRepository } from '@app/repositories/specialist';

@Module({
  imports: [VacancyServiceModule, TypeOrmModule.forFeature([CustomerRepository, SpecialistRepository])],
  controllers: [VacancyController],
  providers: [JWTGuard, RoleGuard]
})
export class VacancyModule {}
