import { IBaseResponse } from '@nonameteam/core';

import { IState } from '@app/interfaces';

export interface IGetLocationResponseData {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  city: string;
  state: IState;
}

export interface IGetLocationResponse extends IBaseResponse {
  data: IGetLocationResponseData;
}
