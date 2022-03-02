export enum Statuses {
  complete,
  new,
  accepted,
}

export interface IOrder {
  description: string;
  title: string;
  customer: ICustomer;
  specialist: ISpecialist;
  dateOfCreate: Date;
  category: ISkill;
  status: Statuses,
  price: number,
}
