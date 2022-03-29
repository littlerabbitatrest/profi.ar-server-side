import { IBaseResponse } from '@nonameteam/core';

import { IState } from '@app/interfaces';

export interface IGetLocationResponseDataItem {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  city: string;
  state: IState;
}

export type IGetLocationsResponseData = IGetLocationResponseDataItem[];

export interface IGetLocationsResponse extends IBaseResponse {
  data: IGetLocationsResponseData;
}
