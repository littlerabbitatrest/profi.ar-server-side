import { Column, Entity, ManyToMany, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntity } from '@nonameteam/core';

import { IVacancy } from '@app/interfaces';
import { Order, Review, Category, Specialist, Scope } from '@app/entities';

@Entity({ name: 'Vacancies' })
export class Vacancy extends BaseEntity implements IVacancy {
  @Column({ type: 'varchar', length: 100 })
    education: string;

  @Column({ type: 'varchar', length: 100 })
    experience: string;

  @Column({ type: 'number' })
    commonRate: number;

  @ManyToOne(() => Specialist, specialist => specialist.vacancies, { cascade: true })
    specialist: Specialist;

  @ManyToOne(() => Scope, scope => scope.vacancies, { cascade: true })
    scope: Scope;

  @ManyToMany(() => Category, category => category.vacancies, { cascade: true })
    categories: Category[];

  @OneToMany(() => Review, review => review.vacancy, { cascade: true })
    reviews: Review[];

  @OneToMany(() => Order, order => order.vacancy, { cascade: true })
    orders: Order[];
}
