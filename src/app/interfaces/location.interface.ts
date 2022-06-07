import { BaseEntity } from '@nonameteam/core';

import { IState } from '@app/interfaces';

export interface ILocation extends BaseEntity {
  city: string;
  state: IState;
}
