import { Module } from '@nestjs/common';

import { VacancyReviewController } from '@app/controllers/vacancy-review';
import { VacancyReviewServiceModule } from '@app/modules/vacancy-review';

@Module({
  imports: [VacancyReviewServiceModule],
  controllers: [VacancyReviewController],
  providers: []
})
export class VacancyReviewModule {}
