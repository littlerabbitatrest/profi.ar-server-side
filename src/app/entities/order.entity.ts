import { BaseEntity } from '@nonameteam/core';
import { Column, Entity, ManyToOne } from 'typeorm';

import { IOrder, Statuses } from '@app/interfaces';
import { Category, Customer, Scope, Vacancy } from '@app/entities';

@Entity({ name: 'Orders' })
export class Order extends BaseEntity implements IOrder {
  @Column({ type: 'varchar', length: 100 })
    title: string;

  @Column({ type: 'varchar', length: 1000 })
    description: string;

  @Column({ type: 'integer', default: 0 })
    price: number;

  @Column({ type: 'enum', enum: Statuses, default: Statuses.moderationOrder })
    status: Statuses;

  @ManyToOne(() => Customer, customer => customer.orders, { onDelete: 'CASCADE' })
    customer: Customer;

  @ManyToOne(() => Vacancy, vacancy => vacancy.orders, { onDelete: 'CASCADE', nullable: true })
    vacancy: Vacancy;

  @ManyToOne(() => Category, category => category.orders, { onDelete: 'CASCADE' })
    category: Category;

  @ManyToOne(() => Scope, scope => scope.orders, { onDelete: 'CASCADE' })
    scope: Scope;
}
