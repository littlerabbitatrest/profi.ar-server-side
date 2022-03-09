import { BaseEntity } from '@nonameteam/core';
import { Column, Entity, OneToMany } from 'typeorm';

import { IScope } from '@app/interfaces';
import { Category, Order, Vacancy } from '@app/entities';

@Entity({ name: 'Scopes' })
export class Scope extends BaseEntity implements IScope {
  @Column()
    name: string;

  @OneToMany(() => Category, category => category.scope, { cascade: true })
    categories: Category[];

  @OneToMany(() => Order, order => order.scope, { cascade: true })
    orders: Order[];

  @OneToMany(() => Vacancy, vacancy => vacancy.scope, { cascade: true })
    vacancies: Vacancy[];
}
