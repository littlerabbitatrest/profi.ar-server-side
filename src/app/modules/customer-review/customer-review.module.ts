import { Module } from '@nestjs/common';

import { CustomerReviewController } from '@app/controllers/customer-review';
import { CustomerReviewServiceModule } from '@app/modules/customer-review';

@Module({
  imports: [CustomerReviewServiceModule],
  controllers: [CustomerReviewController],
  providers: []
})
export class CustomerReviewModule {}
