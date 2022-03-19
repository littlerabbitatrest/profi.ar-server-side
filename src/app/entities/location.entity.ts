import { BaseEntity } from '@nonameteam/core';
import { Column, Entity, OneToMany } from 'typeorm';

import { ILocation } from '@app/interfaces';
import { Customer, Specialist } from '@app/entities';

@Entity({ name: 'Locations' })
export class Location extends BaseEntity implements ILocation {
  @Column({ type: 'varchar', length: 100 })
    state: string;

  @Column({ type: 'varchar', length: 100 })
    city: string;

  @OneToMany(() => Customer, customer => customer.location)
    customers: Customer[];

  @OneToMany(() => Specialist, specialist => specialist.location)
    specialists: Specialist[];
}
