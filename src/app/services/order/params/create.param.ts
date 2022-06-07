export interface ICreateOrder {
  title: string;
  description: string;
  price: number;

  /* Ключи*/
  customerId: string;
  scopeId: string;
  categoryId: string;
}
