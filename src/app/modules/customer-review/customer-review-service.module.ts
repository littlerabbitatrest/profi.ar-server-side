import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CustomerReviewRepository } from '@app/repositories/customer-review';
import { CustomerReviewService } from '@app/services/customer-review';
import { VacancyServiceModule } from '@app/modules/vacancy';
import { CustomerServiceModule } from '@app/modules/customer';
import { SpecialistServiceModule } from '@app/modules/specialist';

@Module({
  imports: [TypeOrmModule.forFeature([CustomerReviewRepository]), SpecialistServiceModule, VacancyServiceModule, CustomerServiceModule],
  providers: [CustomerReviewService],
  exports: [TypeOrmModule.forFeature([CustomerReviewRepository]), CustomerReviewService]
})
export class CustomerReviewServiceModule {}
