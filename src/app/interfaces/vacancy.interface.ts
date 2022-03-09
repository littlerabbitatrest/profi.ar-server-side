import { BaseEntity } from '@nonameteam/core';

import { ICategory, IOrder, IReview, IScope, ISpecialist } from '@app/interfaces';

export interface IVacancy extends BaseEntity {
  education: string;
  experience: string;
  specialist: ISpecialist;
  scope: IScope;
  categories: ICategory[];
  reviews: IReview[];
  orders: IOrder[];
}
