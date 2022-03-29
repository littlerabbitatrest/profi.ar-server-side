import { IScope } from '@app/interfaces';

export interface ICreateCategory {
  title: string;

  /* Отношения*/
  scope: IScope
}
