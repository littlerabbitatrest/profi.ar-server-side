import { BaseEntity } from '@nonameteam/core';
import { Column, Entity, ManyToOne } from 'typeorm';

import { Customer, Specialist, Vacancy } from '@app/entities';
import { ICustomerReview } from '@app/interfaces';

@Entity({ name: 'CustomerReviews' })
export class CustomerReview extends BaseEntity implements ICustomerReview {
  @Column({ type: 'integer' })
    rate: number;

  @Column({ type: 'varchar', length: 1000, nullable: true })
    description: string;

  @ManyToOne(() => Specialist, specialist => specialist.customerReviews, { onDelete: 'CASCADE' })
    specialist: Specialist;

  @ManyToOne(() => Vacancy, vacancy => vacancy.customerReviews, { onDelete: 'CASCADE' })
    vacancy: Vacancy;

  @ManyToOne(() => Customer, customer => customer.customerReviews, { onDelete: 'CASCADE' })
    customer: Customer;
}
