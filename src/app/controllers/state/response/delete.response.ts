import { IBaseResponse } from '@nonameteam/core';

export interface IDeleteStateResponseData {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  name: string;
}

export interface IDeleteStateResponse extends IBaseResponse {
  data: IDeleteStateResponseData;
}
