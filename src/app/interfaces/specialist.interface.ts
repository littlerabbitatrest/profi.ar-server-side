export interface ISpecialist {
  firstName: string;
  lastName: string;
  photoLink: string;
  email: string;
  phone: string;
  skills: ISkill[];
  location: string;
  orders: IOrder[];
  review: IReview[];
}
