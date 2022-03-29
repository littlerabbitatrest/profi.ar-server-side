import { IBaseResponse } from '@nonameteam/core';

export interface IGetStateResponseData {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  name: string;
}

export interface IGetStateResponse extends IBaseResponse {
  data: IGetStateResponseData;
}
