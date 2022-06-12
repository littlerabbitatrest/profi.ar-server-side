import { BaseEntity } from '@nonameteam/core';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';

import { ILocation } from '@app/interfaces';
import { Customer, Specialist, State } from '@app/entities';

@Entity({ name: 'Locations' })
export class Location extends BaseEntity implements ILocation {
  @Column({ type: 'varchar', length: 100 })
    city: string;

  @Column({ type: 'varchar' })
    stateId: string;

  @ManyToOne(() => State, state => state.location, { onDelete: 'CASCADE' })
    state: State;

  @OneToMany(() => Customer, customer => customer.location)
    customers: Customer[];

  @OneToMany(() => Specialist, specialist => specialist.location)
    specialists: Specialist[];
}
