import { IBaseResponse } from '@nonameteam/core';

export interface IDeleteSpecialistResponseData {
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

export interface IDeleteSpecialistResponse extends IBaseResponse {
  data: IDeleteSpecialistResponseData;
}
