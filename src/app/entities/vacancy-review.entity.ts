import { BaseEntity } from '@nonameteam/core';
import { Column, Entity, ManyToOne } from 'typeorm';

import { IVacancyReview } from '@app/interfaces';
import { Customer, Vacancy } from '@app/entities';

@Entity({ name: 'VacancyReviews' })
export class VacancyReview extends BaseEntity implements IVacancyReview {
  @Column({ type: 'integer' })
    rate: number;

  @Column({ type: 'varchar', length: 1000, nullable: true })
    description: string;

  @ManyToOne(() => Vacancy, vacancy => vacancy.vacancyReviews, { onDelete: 'CASCADE' })
    vacancy: Vacancy;

  @ManyToOne(() => Customer, customer => customer.vacancyReviews, { onDelete: 'CASCADE' })
    customer: Customer;
}
