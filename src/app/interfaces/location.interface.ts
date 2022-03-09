import { BaseEntity } from '@nonameteam/core';

export interface ILocation extends BaseEntity {
  state: string;
  city: string;
}
