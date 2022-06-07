import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { VacancyRepository } from '@app/repositories/vacancy';
import { VacancyService } from '@app/services/vacancy';
import { SpecialistServiceModule } from '@app/modules/specialist';
import { ScopeServiceModule } from '@app/modules/scope';
import { CategoryServiceModule } from '@app/modules/category';

@Module({
  imports: [TypeOrmModule.forFeature([VacancyRepository]), SpecialistServiceModule, ScopeServiceModule, CategoryServiceModule],
  providers: [VacancyService],
  exports: [TypeOrmModule.forFeature([VacancyRepository]), VacancyService]
})
export class VacancyServiceModule {}
