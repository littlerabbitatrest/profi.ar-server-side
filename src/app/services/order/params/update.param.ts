import { Statuses } from '@app/interfaces';

export interface IUpdateOrder {
  title: string;
  description: string;
  price: number;
  status: Statuses;

  /* Отношения*/
  vacancyId: string;
}
