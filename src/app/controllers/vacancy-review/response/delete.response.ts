import { IBaseResponse } from '@nonameteam/core';

export interface IDeleteVacancyReviewResponseData {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  rate: number;
  description: string;
}

export interface IDeleteVacancyReviewResponse extends IBaseResponse{
data: IDeleteVacancyReviewResponseData;
}
