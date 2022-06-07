import { BaseEntity } from '@nonameteam/core';

import { ICustomer, IVacancy } from '@app/interfaces';

export interface IVacancyReview extends BaseEntity {
  rate: number;
  description: string;
  vacancy: IVacancy;
  customer: ICustomer;
}
