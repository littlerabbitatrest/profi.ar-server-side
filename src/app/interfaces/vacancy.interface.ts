import { BaseEntity } from '@nonameteam/core';

import { ICategory, IOrder, IVacancyReview, IScope, ISpecialist } from '@app/interfaces';

export interface IVacancy extends BaseEntity {
  education: string;
  experience: string;
  commonRate: number;
  specialist: ISpecialist;
  scope: IScope;
  category: ICategory;
  orders: IOrder[];
  vacancyReviews: IVacancyReview[];
}
