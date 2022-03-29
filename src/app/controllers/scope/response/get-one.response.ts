import { IBaseResponse } from '@nonameteam/core';

export interface IGetScopeResponseData {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  name: string;
}

export interface IGetScopeResponse extends IBaseResponse {
  data: IGetScopeResponseData;
}
