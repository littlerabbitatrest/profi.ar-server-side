export interface IUpdateCustomer {
  firstName: string;
  lastName: string;
  photoLink: string;
  email: string;
  phone: string;
  commonRate?: number;

  /* Ключи*/
  locationId: string;
}
