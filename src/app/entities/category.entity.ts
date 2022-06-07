import { BaseEntity } from '@nonameteam/core';
import { Column, Entity, OneToMany, ManyToOne } from 'typeorm';

import { ICategory } from '@app/interfaces';
import { Order, Scope, Vacancy } from '@app/entities';

@Entity({ name: 'Categories' })
export class Category extends BaseEntity implements ICategory {
  @Column({ type: 'varchar', length: 100 })
    title: string;

  @ManyToOne(() => Scope, scope => scope.categories, { onDelete: 'CASCADE' })
    scope: Scope;

  @OneToMany(() => Vacancy, vacancy => vacancy.category)
    vacancies: Vacancy[];

  @OneToMany(() => Order, order => order.category)
    orders: Order[];
}
