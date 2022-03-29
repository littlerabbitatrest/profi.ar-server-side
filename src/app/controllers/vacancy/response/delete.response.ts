import { IBaseResponse } from '@nonameteam/core';

export interface IDeleteVacancyResponseData {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  education: string;
  experience: string;
  commonRate: number;
}

export interface IDeleteVacancyResponse extends IBaseResponse {
  data: IDeleteVacancyResponseData;
}
