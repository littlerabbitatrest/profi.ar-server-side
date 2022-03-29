import { IBaseResponse } from '@nonameteam/core';

export interface IDeleteScopeResponseData {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  name: string;
}

export interface IDeleteScopeResponse extends IBaseResponse {
  data: IDeleteScopeResponseData;
}
