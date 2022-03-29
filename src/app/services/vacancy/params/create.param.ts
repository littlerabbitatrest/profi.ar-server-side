import { ICategory, IScope, ISpecialist } from '@app/interfaces';

export interface ICreateVacancy {
  education: string;
  experience: string;

  /* Отношения*/
  specialist: ISpecialist;
  scope: IScope;
  category: ICategory;
}
