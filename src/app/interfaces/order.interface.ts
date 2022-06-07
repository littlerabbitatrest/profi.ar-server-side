import { BaseEntity } from '@nonameteam/core';

import { ICategory, ICustomer, IScope, IVacancy } from '@app/interfaces';

export enum Statuses {
  moderationOrder = 'moderation',
  rejectedOrder = 'rejected',
  openOder = 'open',
  acceptedOrder = 'accepted',
  completedOrder = 'completed',
  canceledOrder = 'canceled'
}

export interface IOrder extends BaseEntity {
  title: string;
  description: string;
  price: number;
  status: Statuses;
  customer: ICustomer;
  vacancy: IVacancy;
  scope: IScope;
  category: ICategory;
}
