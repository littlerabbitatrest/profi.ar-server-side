import { IBaseResponse } from '@nonameteam/core';

export interface IDeleteCategoryResponseData {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  name: string;
}

export interface IDeleteCategoryResponse extends IBaseResponse {
  data: IDeleteCategoryResponseData;
}
