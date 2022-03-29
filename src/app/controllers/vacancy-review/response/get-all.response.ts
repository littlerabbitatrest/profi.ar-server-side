import { IBaseResponse } from '@nonameteam/core';

export interface IGetVacancyReviewResponseDataItem {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  rate: number;
  description: string;
}

export type IGetVacanciesReviewResponseData = IGetVacancyReviewResponseDataItem[];

export interface IGetVacanciesReviewsResponse extends IBaseResponse{
  data: IGetVacanciesReviewResponseData;
}
