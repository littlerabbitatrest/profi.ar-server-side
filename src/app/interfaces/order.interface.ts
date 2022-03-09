import { BaseEntity } from '@nonameteam/core';

import { ICustomer, IScope, IVacancy } from '@app/interfaces';

export enum Statuses {
  newOrder,
  acceptedOrder,
  completedOrder,
}

export interface IOrder extends BaseEntity {
  title: string;
  description: string;
  price: number;
  status: Statuses;
  customer: ICustomer;
  vacancy: IVacancy;
  scope: IScope;
}
