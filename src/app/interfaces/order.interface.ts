import { BaseEntity } from '@nonameteam/core';

import { ICustomer, ISpecialist, IScope } from '@app/interfaces';

export enum Statuses {
  newOrder,
  acceptedOrder,
  completedOrder,
}

export interface IOrder extends BaseEntity {
  title: string;
  description: string;
  price: number;
  customer: ICustomer;
  specialist: ISpecialist;
  scope: IScope;
  status: Statuses;
}
