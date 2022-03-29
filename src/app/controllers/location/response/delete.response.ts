import { IBaseResponse } from '@nonameteam/core';

import { IState } from '@app/interfaces';

export interface IDeleteLocationResponseData {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  city: string;
  state: IState;
}

export interface IDeleteLocationResponse extends IBaseResponse {
  data: IDeleteLocationResponseData;
}
