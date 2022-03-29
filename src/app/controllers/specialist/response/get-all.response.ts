import { IBaseResponse } from '@nonameteam/core';

export interface IGetSpecialistResponseDataItem {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  firstName: string;
  lastName: string;
  photoLink: string;
  email: string;
  phone: string;
  password: string;
}

export type IGetSpecialistsResponseData = IGetSpecialistResponseDataItem[];

export interface IGetSpecialistsResponse extends IBaseResponse {
  data: IGetSpecialistsResponseData;
}
