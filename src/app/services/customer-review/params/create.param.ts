import { ICustomer, ISpecialist, IVacancy } from '@app/interfaces';

export interface ICreateCustomerReview {
  rate: number;
  description?: string;

  /* Отношения*/
  specialist: ISpecialist;
  vacancy: IVacancy;
  customer: ICustomer;
}
