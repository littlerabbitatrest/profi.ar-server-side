import { BaseEntity } from '@nonameteam/core';

import { IVacancy, ISpecialist, ICustomer } from '@app/interfaces';

export interface ICustomerReview extends BaseEntity {
  rate: number;
  description: string;
  specialist: ISpecialist;
  vacancy: IVacancy;
  customer: ICustomer;
}
