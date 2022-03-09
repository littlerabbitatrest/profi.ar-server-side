import { BaseEntity } from '@nonameteam/core';

import { ILocation, IVacancy } from '@app/interfaces';

export interface ISpecialist extends BaseEntity{
  firstName: string;
  lastName: string;
  photoLink: string;
  email: string;
  phone: string;
  password: string;
  commonRate: number;
  location: ILocation;
  vacancies: IVacancy[];
}
