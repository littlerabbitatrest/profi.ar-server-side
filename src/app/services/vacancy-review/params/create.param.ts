import { ICustomer, IVacancy } from '@app/interfaces';

export interface ICreateVacancyReview {
  rate: number;
  description: string;

  /* Отношения*/
  vacancy: IVacancy;
  customer: ICustomer;

}
