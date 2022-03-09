import { BaseEntity } from '@nonameteam/core';

import { IOrder, IReview, ISkill, ISpecialist } from '@app/interfaces';

export interface IVacancy extends BaseEntity {
  education: string;
  experience: string;
  specialist: ISpecialist;
  skills: ISkill[];
  review: IReview[];
  orders: IOrder[];
}
