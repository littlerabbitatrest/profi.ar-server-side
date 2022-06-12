import { BaseEntity } from '@nonameteam/core';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';

import { ICustomer, Roles } from '@app/interfaces';
import { Order, Location, VacancyReview, CustomerReview } from '@app/entities';

@Entity({ name: 'Customers' })
export class Customer extends BaseEntity implements ICustomer {
  @Column({ type: 'varchar', length: 50 })
    firstName: string;

  @Column({ type: 'varchar', length: 50 })
    lastName: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
    photoLink: string;

  @Column({ type: 'varchar', length: 50 })
    email: string;

  @Column({ type: 'varchar', length: 13 })
    phone: string;

  @Column({ type: 'varchar', length: 200 })
    password: string;

  @Column({ type: 'integer', default: 0 })
    commonRate: number;

  @Column({ type: 'varchar', nullable: false })
    locationId: string;

  @Column({ type: 'enum', enum: Roles, default: Roles.common })
    role: Roles;

  @ManyToOne(() => Location, location => location.customers)
    location: Location;

  @OneToMany(() => Order, order => order.customer, { cascade: true })
    orders: Order[];

  @OneToMany(() => VacancyReview, vacancyReview => vacancyReview.customer, { cascade: true })
    vacancyReviews: VacancyReview[];

  @OneToMany(() => CustomerReview, customerReview => customerReview.customer, { cascade: true })
    customerReviews: CustomerReview[];
}
