import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { VacancyReviewRepository } from '@app/repositories/vacancy-review';
import { VacancyReviewService } from '@app/services/vacancy-review';

@Module({
  imports: [TypeOrmModule.forFeature([VacancyReviewRepository])],
  providers: [VacancyReviewService],
  exports: [TypeOrmModule.forFeature([VacancyReviewRepository]), VacancyReviewService]
})
export class VacancyReviewServiceModule {}
