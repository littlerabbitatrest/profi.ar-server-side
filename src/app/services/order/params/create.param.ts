import { ICustomer, IScope } from '@app/interfaces';

export interface ICreateOrder {
  title: string;
  description: string;
  price: number;

  /* Отношения*/
  customer: ICustomer;
  scope: IScope;
}
