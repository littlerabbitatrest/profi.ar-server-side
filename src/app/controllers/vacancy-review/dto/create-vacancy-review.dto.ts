import { IsInt, IsOptional, IsString, Length, Max, Min } from 'class-validator';

import { ICustomer, IVacancy } from '@app/interfaces';

export class CreateVacancyReviewDto {
  @IsInt()
  @Min(1)
  @Max(5)
    rate: number;

  @IsOptional()
  @IsString()
  @Length(1, 1000)
    description: string;

  /* Отношения*/
  vacancy: IVacancy;
  customer: ICustomer;
}
