import { BaseEntity } from '@nonameteam/core';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';

import { ISpecialist } from '@app/interfaces';
import { Vacancy, Location, CustomerReview } from '@app/entities';

@Entity({ name: 'Specialists' })
export class Specialist extends BaseEntity implements ISpecialist {
  @Column({ type: 'varchar', length: 50 })
    firstName: string;

  @Column({ type: 'varchar', length: 50 })
    lastName: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
    photoLink: string;

  @Column({ type: 'varchar', length: 50 })
    email: string;

  @Column({ type: 'varchar', length: 13 })
    phone: string;

  @Column({ type: 'varchar', length: 200 })
    password: string;

  @Column({ type: 'varchar' })
    locationId: string;

  @ManyToOne(() => Location, location => location.specialists)
    location: Location;

  @OneToMany(() => Vacancy, vacancy => vacancy.specialist, { cascade: true })
    vacancies: Vacancy[];

  @OneToMany(() => CustomerReview, customerReview => customerReview.specialist)
    customerReviews: CustomerReview[];
}
