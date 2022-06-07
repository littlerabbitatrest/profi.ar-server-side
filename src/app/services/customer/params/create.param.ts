export interface ICreateCustomer {
  firstName: string;
  lastName: string;
  photoLink?: string;
  email: string;
  phone: string;
  password: string;

  /* Ключи*/
  locationId: string;
}
