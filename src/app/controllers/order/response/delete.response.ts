import { IBaseResponse } from '@nonameteam/core';

import { Statuses } from '@app/interfaces';

export interface IDeleteOrderResponseData {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  title: string;
  description: string;
  price: number;
  status: Statuses;
}

export interface IDeleteOrderResponse extends IBaseResponse {
  data: IDeleteOrderResponseData;
}
