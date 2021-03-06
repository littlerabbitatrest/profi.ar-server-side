import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntity } from '@nonameteam/core';

import { IVacancy } from '@app/interfaces';
import { Order, Category, Specialist, Scope, VacancyReview, CustomerReview } from '@app/entities';

@Entity({ name: 'Vacancies' })
export class Vacancy extends BaseEntity implements IVacancy {
  @Column({ type: 'varchar', length: 100, nullable: true })
    education: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
    experience: string;

  @Column({ type: 'integer', default: 0 })
    commonRate: number;

  @Column({ type: 'varchar' })
    specialistId: string;

  @ManyToOne(() => Specialist, specialist => specialist.vacancies, { onDelete: 'CASCADE' })
    specialist: Specialist;

  @ManyToOne(() => Scope, scope => scope.vacancies, { onDelete: 'CASCADE' })
    scope: Scope;

  @ManyToOne(() => Category, category => category.vacancies, { onDelete: 'CASCADE' })
    category: Category;

  @OneToMany(() => VacancyReview, vacancyReview => vacancyReview.vacancy)
    vacancyReviews: VacancyReview[];

  @OneToMany(() => CustomerReview, customerReview => customerReview.vacancy)
    customerReviews: CustomerReview[];

  @OneToMany(() => Order, order => order.vacancy, { cascade: true })
    orders: Order[];
}
