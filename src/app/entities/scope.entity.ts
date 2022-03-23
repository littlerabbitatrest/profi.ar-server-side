import { BaseEntity } from '@nonameteam/core';
import { Column, Entity, OneToMany } from 'typeorm';

import { IScope } from '@app/interfaces';
import { Category, Order, Vacancy } from '@app/entities';

@Entity({ name: 'Scopes' })
export class Scope extends BaseEntity implements IScope {
  @Column({ type: 'varchar', length: 70 })
    name: string;

  @OneToMany(() => Category, category => category.scope, { cascade: true })
    categories: Category[];

  @OneToMany(() => Order, order => order.scope)
    orders: Order[];

  @OneToMany(() => Vacancy, vacancy => vacancy.scope)
    vacancies: Vacancy[];
}
