import { IsString, Length } from 'class-validator';

import { ICategory, IScope, ISpecialist } from '@app/interfaces';

export class CreateVacancyDto {
  @IsString()
  @Length(1, 100)
    education: string;

  @IsString()
  @Length(1, 100)
    experience: string;

  scope: IScope;
  category: ICategory;
  specialist: ISpecialist;
}
