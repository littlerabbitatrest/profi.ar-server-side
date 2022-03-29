import { IBaseResponse } from '@nonameteam/core';

import { Statuses } from '@app/interfaces';

export interface IGetOrderResponseData {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  title: string;
  description: string;
  price: number;
  status: Statuses;
}

export interface IGetOrderResponse extends IBaseResponse {
  data: IGetOrderResponseData;
}
