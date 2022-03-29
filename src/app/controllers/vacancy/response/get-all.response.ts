import { IBaseResponse } from '@nonameteam/core';

export interface IGetVacancyResponseDataItem {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  education: string;
  experience: string;
  commonRate: number;
}

export type IGetVacanciesResponseData = IGetVacancyResponseDataItem[];

export interface IGetVacanciesResponse extends IBaseResponse {
  data: IGetVacanciesResponseData;
}
