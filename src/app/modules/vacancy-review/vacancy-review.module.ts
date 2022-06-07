import { Module } from '@nestjs/common';

import { VacancyReviewController } from '@app/controllers/vacancy-review';
import { VacancyReviewServiceModule } from '@app/modules/vacancy-review';
import { JWTGuard, RoleGuard } from '@app/guards';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomerRepository } from '@app/repositories/customer';
import { SpecialistRepository } from '@app/repositories/specialist';

@Module({
  imports: [VacancyReviewServiceModule, TypeOrmModule.forFeature([CustomerRepository, SpecialistRepository])],
  controllers: [VacancyReviewController],
  providers: [JWTGuard, RoleGuard]
})
export class VacancyReviewModule {}
