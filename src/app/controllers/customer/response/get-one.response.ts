import { IBaseResponse } from '@nonameteam/core';

import { Roles } from '@app/interfaces';

export interface IGetCustomerResponseData{
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

export interface IGetCustomerResponse extends IBaseResponse {
  data: IGetCustomerResponseData;
}
