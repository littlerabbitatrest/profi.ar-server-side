import { ICustomer } from '@app/interfaces/customer.interface';

export interface IReview {
  orderId: string;
  description: string;
  customer: ICustomer,
  rate: number,
  dateOfCreate: Date,
}
