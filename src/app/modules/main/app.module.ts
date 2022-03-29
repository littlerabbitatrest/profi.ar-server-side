import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { CategoryModule } from '@app/modules/category';
import { CustomerModule } from '@app/modules/customer';
import { CustomerReviewModule } from '@app/modules/customer-review';
import { LocationModule } from '@app/modules/location';
import { OrderModule } from '@app/modules/order';
import { ScopeModule } from '@app/modules/scope';
import { SpecialistModule } from '@app/modules/specialist';
import { StateModule } from '@app/modules/state';
import { VacancyModule } from '@app/modules/vacancy';
import { VacancyReviewModule } from '@app/modules/vacancy-review';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    CategoryModule,
    CustomerModule,
    CustomerReviewModule,
    LocationModule,
    OrderModule,
    ScopeModule,
    SpecialistModule,
    StateModule,
    VacancyModule,
    VacancyReviewModule

  ]
})
export class AppModule {}
