import { BaseEntity } from '@nonameteam/core';
import { Column, Entity, ManyToOne } from 'typeorm';

import { IOrder, Statuses } from '@app/interfaces';
import { Customer, Scope, Vacancy } from '@app/entities';

@Entity({ name: 'Orders' })
export class Order extends BaseEntity implements IOrder {
  @Column({ type: 'varchar', length: 100 })
    title: string;

  @Column({ type: 'varchar', length: 200 })
    description: string;

  @Column({ type: 'money' })
    price: number;

  @Column({ type: 'enum', enum: Statuses })
    status: Statuses;

  @ManyToOne(() => Customer, customer => customer.orders, { cascade: true })
    customer: Customer;

  @ManyToOne(() => Vacancy, vacancy => vacancy.orders, { cascade: true })
    vacancy: Vacancy;

  @ManyToOne(() => Scope, scope => scope.orders, { cascade: true })
    scope: Scope;
}
