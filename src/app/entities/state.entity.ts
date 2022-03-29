import { BaseEntity } from '@nonameteam/core';
import { Column, OneToMany } from 'typeorm';

import { IState } from '@app/interfaces';
import { Location } from '@app/entities';

export class State extends BaseEntity implements IState {
  @Column({ type: 'varchar', length: 100 })
    name: string;

  @OneToMany(() => Location, location => location.state, { cascade: true })
    location: Location[];
}
