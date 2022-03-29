import { ILocation } from '@app/interfaces';

export interface IUpdateCustomer {
  firstName: string;
  lastName: string;
  photoLink: string;
  email: string;
  phone: string;
  password: string;

  /* Отношения*/
  location: ILocation;
}
