import { IBaseResponse } from '@nonameteam/core';

import { ICustomer, ISpecialist, IVacancy } from '@app/interfaces';

export interface IGetCustomerReviewResponseData {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  description: string;
  rate: number;
  specialist: ISpecialist;
  vacancy: IVacancy;
  customer: ICustomer;
}

export interface IGetCustomerReviewResponse extends IBaseResponse{
  data: IGetCustomerReviewResponseData;
}
