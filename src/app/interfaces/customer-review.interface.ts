import { IVacancy } from '@app/interfaces/vacancy.interface';
import { ICustomer } from '@app/interfaces/customer.interface';
import { ISpecialist } from '@app/interfaces/specialist.interface';

export interface ICustomerReview {
  description: string;
  rate: number;
  specialist: ISpecialist;
  vacancy: IVacancy;
  customer: ICustomer;
}
