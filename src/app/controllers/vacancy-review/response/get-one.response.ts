import { IBaseResponse } from '@nonameteam/core';

export interface IGetVacancyReviewResponseData {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  rate: number;
  description: string;
}

export interface IGetVacancyReviewResponse extends IBaseResponse{
  data: IGetVacancyReviewResponseData;
}
