import { IBaseResponse } from '@nonameteam/core';

export interface IGetVacancyResponseData {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  education: string;
  experience: string;
  commonRate: number;
}

export interface IGetVacancyResponse extends IBaseResponse {
  data: IGetVacancyResponseData;
}
