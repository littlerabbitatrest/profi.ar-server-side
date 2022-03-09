import { BaseEntity } from '@nonameteam/core';

import { ISkill } from '@app/interfaces';

// Сфера деятельности

export interface IScope extends BaseEntity {
  name: string;
  skills: ISkill[];
}
