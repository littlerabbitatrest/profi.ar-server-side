import { IBaseResponse } from '@nonameteam/core';

export interface IGetScopeResponseDataItem {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  name: string;
}

export type IGetScopesResponseData = IGetScopeResponseDataItem[];

export interface IGetScopesResponse extends IBaseResponse {
  data: IGetScopesResponseData;
}
