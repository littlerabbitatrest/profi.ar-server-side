export interface ICreateCustomerReview {
  rate: number;
  description: string;

  /* Ключи*/
  specialistId: string;
  vacancyId: string;
  customerId: string;
}
