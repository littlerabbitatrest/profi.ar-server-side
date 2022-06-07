import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { VacancyReviewRepository } from '@app/repositories/vacancy-review';
import { VacancyReviewService } from '@app/services/vacancy-review';
import { CustomerServiceModule } from '@app/modules/customer';
import { VacancyServiceModule } from '@app/modules/vacancy';

@Module({
  imports: [TypeOrmModule.forFeature([VacancyReviewRepository]), CustomerServiceModule, VacancyServiceModule],
  providers: [VacancyReviewService],
  exports: [TypeOrmModule.forFeature([VacancyReviewRepository]), VacancyReviewService]
})
export class VacancyReviewServiceModule {}
