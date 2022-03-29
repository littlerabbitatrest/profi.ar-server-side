import { IBaseResponse } from '@nonameteam/core';

export interface IGetStateResponseDataItem {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  name: string;
}

export type IGetStatesResponseData = IGetStateResponseDataItem[];

export interface IGetStatesResponse extends IBaseResponse {
  data: IGetStatesResponseData;
}
