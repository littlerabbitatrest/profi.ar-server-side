import { IsInt, IsOptional, IsString, Length, Max, Min } from 'class-validator';

import { ICustomer, ISpecialist, IVacancy } from '@app/interfaces';

export class CreateCustomerReviewDto {
  @IsInt()
  @Min(1)
  @Max(5)
    rate: number;

  @IsOptional()
  @IsString()
  @Length(1, 1000)
    description?: string;

  /* Отношения*/
  specialist: ISpecialist;
  vacancy: IVacancy;
  customer: ICustomer;
}
