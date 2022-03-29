import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { VacancyRepository } from '@app/repositories/vacancy';
import { VacancyService } from '@app/services/vacancy';

@Module({
  imports: [TypeOrmModule.forFeature([VacancyRepository])],
  providers: [VacancyService],
  exports: [TypeOrmModule.forFeature([VacancyRepository]), VacancyService]
})
export class VacancyServiceModule {}
