import { IBaseResponse } from '@nonameteam/core';

export interface IDeleteCustomerReviewResponseData {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  description: string;
  rate: number;
}

export interface IDeleteCustomerReviewResponse extends IBaseResponse{
data: IDeleteCustomerReviewResponseData;
}
