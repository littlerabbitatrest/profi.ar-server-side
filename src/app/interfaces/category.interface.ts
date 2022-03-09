import { BaseEntity } from '@nonameteam/core';

import { IScope } from '@app/interfaces';

export interface ICategory extends BaseEntity {
  title: string;
  scope: IScope;
}
