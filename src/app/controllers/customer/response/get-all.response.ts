import { IBaseResponse } from '@nonameteam/core';

import { Roles } from '@app/interfaces';

export interface IGetCustomerResponseDataItem{
  id: string;
  createdAt: Date;
  updatedAt: Date;
  firstName: string;
  lastName: string;
  photoLink: string;
  email: string;
  phone: string;
  password: string;
  commonRate: number;
  role: Roles;
}

export type IGetCustomersResponseData = IGetCustomerResponseDataItem[];

export interface IGetCustomersResponse extends IBaseResponse {
  data: IGetCustomersResponseData;
}
