import { Module } from '@nestjs/common';

import { CustomerReviewController } from '@app/controllers/customer-review';
import { CustomerReviewServiceModule } from '@app/modules/customer-review';
import { JWTGuard, RoleGuard } from '@app/guards';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomerRepository } from '@app/repositories/customer';
import { SpecialistRepository } from '@app/repositories/specialist';

@Module({
  imports: [CustomerReviewServiceModule, TypeOrmModule.forFeature([CustomerRepository, SpecialistRepository])],
  controllers: [CustomerReviewController],
  providers: [JWTGuard, RoleGuard]
})
export class CustomerReviewModule {}
