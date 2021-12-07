import { BaseEntity } from '@nonameteam/core';

import { IMan } from '@app/interfaces';

export interface ICat extends BaseEntity {
  name: string;

  // Relations
  man: IMan;
}
