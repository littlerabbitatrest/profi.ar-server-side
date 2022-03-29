import { IBaseResponse } from '@nonameteam/core';

import { Statuses } from '@app/interfaces';

export interface IGetOrderResponseDataItem {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  title: string;
  description: string;
  price: number;
  status: Statuses;
}

export type IGetOrdersResponseData = IGetOrderResponseDataItem[];

export interface IGetOrdersResponse extends IBaseResponse {
  data: IGetOrdersResponseData;
}
