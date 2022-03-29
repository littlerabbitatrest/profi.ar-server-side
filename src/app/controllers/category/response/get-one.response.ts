import { IBaseResponse } from '@nonameteam/core';

export interface IGetCategoryResponseData {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  name: string;
}

export interface IGetCategoryResponse extends IBaseResponse {
  data: IGetCategoryResponseData;
}
