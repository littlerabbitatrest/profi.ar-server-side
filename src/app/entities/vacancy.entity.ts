import { Column, Entity, ManyToMany, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntity } from '@nonameteam/core';

import { IVacancy } from '@app/interfaces';
import { Order, Category, Specialist, Scope, VacancyReview } from '@app/entities';
import { CustomerReview } from '@app/entities/customer-review.entity';

@Entity({ name: 'Vacancies' })
export class Vacancy extends BaseEntity implements IVacancy {
  @Column({ type: 'varchar', length: 100, nullable: true })
    education: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
    experience: string;

  @Column({ type: 'integer', default: 0 })
    commonRate: number;

  @ManyToOne(() => Specialist, specialist => specialist.vacancies, { onDelete: 'CASCADE' })
    specialist: Specialist;

  @ManyToOne(() => Scope, scope => scope.vacancies)
    scope: Scope;

  @ManyToMany(() => Category, category => category.vacancies)
    categories: Category[];

  @OneToMany(() => VacancyReview, vacancyReview => vacancyReview.vacancy)
    vacancyReviews: VacancyReview[];

  @OneToMany(() => CustomerReview, customerReview => customerReview.vacancy)
    customerReviews: CustomerReview[];

  @OneToMany(() => Order, order => order.vacancy, { cascade: true })
    orders: Order[];
}
