import { BaseEntity } from '@nonameteam/core';

import { IScope } from '@app/interfaces';

export interface ISkill extends BaseEntity {
  title: string;
  scope: IScope;
}
