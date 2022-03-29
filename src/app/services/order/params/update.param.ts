import { Statuses, IVacancy } from '@app/interfaces';

export interface IUpdateOrder {
  title: string;
  description: string;
  price: number;
  status: Statuses;

  /* Отношения*/
  vacancy: IVacancy;
}
