import { IBaseResponse } from '@nonameteam/core';

import { ICustomer, ISpecialist, IVacancy } from '@app/interfaces';

export interface IGetCustomerReviewResponseDataItem {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  description: string;
  rate: number;
  specialist: ISpecialist;
  vacancy: IVacancy;
  customer: ICustomer;
}

export type IGetCustomersReviewResponseData = IGetCustomerReviewResponseDataItem[];

export interface IGetCustomerReviewsResponse extends IBaseResponse{
  data: IGetCustomersReviewResponseData;
}
