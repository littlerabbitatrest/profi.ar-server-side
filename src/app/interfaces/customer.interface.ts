import { BaseEntity } from '@nonameteam/core';

import { ILocation, IOrder, IReview } from '@app/interfaces';

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
  reviews: IReview[];
}
