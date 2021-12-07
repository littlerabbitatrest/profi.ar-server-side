import { BaseEntity } from '@nonameteam/core';

import { ICat } from '@app/interfaces';

export interface IMan extends BaseEntity {
    name: string;
    age: number;

    // Relations:
    cats: ICat[];
}
