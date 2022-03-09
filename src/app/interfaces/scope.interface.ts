import { BaseEntity } from '@nonameteam/core';

import { ICategory } from '@app/interfaces';

// Сфера деятельности

export interface IScope extends BaseEntity {
  name: string;
  categories: ICategory[];
}
