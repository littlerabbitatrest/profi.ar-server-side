import { BaseEntity } from '@nonameteam/core';
import { Column, Entity, ManyToOne } from 'typeorm';

import { IReview } from '@app/interfaces';
import { Customer, Vacancy } from '@app/entities';

@Entity({ name: 'Reviews' })
export class Review extends BaseEntity implements IReview {
  @Column({ type: 'number' })
    rate: number;

  @Column({ type: 'varchar', length: 200 })
    description: string;

  @ManyToOne(() => Vacancy, vacancy => vacancy.reviews, { cascade: true })
    vacancy: Vacancy;

  @ManyToOne(() => Customer, customer => customer.reviews, { cascade: true })
    customer: Customer;
}
