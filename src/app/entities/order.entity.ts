import { BaseEntity } from '@nonameteam/core';
import { Column, Entity, ManyToOne } from 'typeorm';

import { IOrder, Statuses } from '@app/interfaces';
import { Customer, Scope, Vacancy } from '@app/entities';

@Entity({ name: 'Orders' })
export class Order extends BaseEntity implements IOrder {
  @Column({ type: 'varchar', length: 100 })
    title: string;

  @Column({ type: 'varchar', length: 1000 })
    description: string;

  @Column({ type: 'integer', default: 0 })
    price: number;

  @Column({ type: 'enum', enum: Statuses, default: Statuses.newOrder })
    status: Statuses;

  @ManyToOne(() => Customer, customer => customer.orders, { onDelete: 'CASCADE' })
    customer: Customer;

  @ManyToOne(() => Vacancy, vacancy => vacancy.orders, { onDelete: 'CASCADE' })
    vacancy: Vacancy;

  @ManyToOne(() => Scope, scope => scope.orders, { onDelete: 'CASCADE' })
    scope: Scope;
}
