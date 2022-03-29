import { IBaseResponse } from '@nonameteam/core';

export interface IGetCategoryResponseDataItem {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  name: string;
}

export type IGetCategoriesResponseData = IGetCategoryResponseDataItem[];

export interface IGetCategoriesResponse extends IBaseResponse {
  data: IGetCategoriesResponseData;
}
