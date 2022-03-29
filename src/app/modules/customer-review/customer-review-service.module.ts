import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CustomerReviewRepository } from '@app/repositories/customer-review';
import { CustomerReviewService } from '@app/services/customer-review';

@Module({
  imports: [TypeOrmModule.forFeature([CustomerReviewRepository])],
  providers: [CustomerReviewService],
  exports: [TypeOrmModule.forFeature([CustomerReviewRepository]), CustomerReviewService]
})
export class CustomerReviewServiceModule {}
