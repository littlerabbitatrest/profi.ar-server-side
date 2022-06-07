export interface ICreateVacancyReview {
  rate: number;
  description: string;

  /* Ключи*/
  vacancyId: string;
  customerId: string;

}
