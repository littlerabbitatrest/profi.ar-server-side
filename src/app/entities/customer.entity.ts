import { BaseEntity } from '@nonameteam/core';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';

import { ICustomer } from '@app/interfaces';
import { Order, Review, Location } from '@app/entities';

@Entity({ name: 'Customers' })
export class Customer extends BaseEntity implements ICustomer {
  @Column({ type: 'varchar', length: 50 })
    firstName: string;

  @Column({ type: 'varchar', length: 50 })
    lastName: string;

  @Column({ type: 'varchar', length: 100 })
    photoLink: string;

  @Column({ type: 'varchar', length: 50 })
    email: string;

  @Column({ type: 'varchar', length: 50 })
    phone: string;

  @Column({ type: 'varchar', length: 50 })
    password: string;

  @Column({ type: 'number' })
    commonRate: number;

  @ManyToOne(() => Location, location => location.customers, { cascade: true })
    location: Location;

  @OneToMany(() => Order, order => order.customer, { cascade: true })
    orders: Order[];

  @OneToMany(() => Review, review => review.customer, { cascade: true })
    reviews: Review[];
}
