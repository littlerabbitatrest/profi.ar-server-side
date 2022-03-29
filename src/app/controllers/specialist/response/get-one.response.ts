import { IBaseResponse } from '@nonameteam/core';

export interface IGetSpecialistResponseData {
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

export interface IGetSpecialistResponse extends IBaseResponse {
  data: IGetSpecialistResponseData;
}
