import { Roles } from '@app/interfaces';

export interface IDeleteCustomerResponse{
  id: string;
  firstName: string;
  lastName: string;
  photoLink: string;
  email: string;
  phone: string;
  commonRate: number;
  role: Roles;
  location: {
    id: string;
    city: string;
    state: {
      name: string;
    }
  }
}
