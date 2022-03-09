import { BaseEntity } from '@nonameteam/core';

import { ICustomer, IVacancy } from '@app/interfaces';

export interface IReview extends BaseEntity {
  description: string;
  rate: number;
  vacancy: IVacancy;
  customer: ICustomer;
}
