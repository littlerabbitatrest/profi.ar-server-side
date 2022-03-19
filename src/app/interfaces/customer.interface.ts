import { BaseEntity } from '@nonameteam/core';

import { ICustomerReview, ILocation, IOrder, IVacancyReview } from '@app/interfaces';

export interface ICustomer extends BaseEntity {
  firstName: string;
  lastName: string;
  photoLink: string;
  email: string;
  phone: string;
  password: string;
  commonRate: number;
  location: ILocation;
  orders: IOrder[];
  vacancyReviews: IVacancyReview[];
  customerReviews: ICustomerReview[];
}
