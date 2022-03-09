import { BaseEntity } from '@nonameteam/core';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';

import { ISpecialist } from '@app/interfaces';
import { Vacancy, Location } from '@app/entities';

@Entity({ name: 'Specialists' })
export class Specialist extends BaseEntity implements ISpecialist {
  @Column({ type: 'varchar', length: 50 })
    firstName: string;

  @Column({ type: 'varchar', length: 50 })
    lastName: string;

  @Column({ type: 'varchar', length: 100 })
    photoLink: string;

  @Column({ type: 'varchar', length: 50 })
    email: string;

  @Column({ type: 'varchar', length: 50 })
    phone: string;

  @Column({ type: 'varchar', length: 50 })
    password: string;

  @ManyToOne(() => Location, location => location.specialists, { cascade: true })
    location: Location;

  @OneToMany(() => Vacancy, vacancy => vacancy.specialist, { cascade: true })
    vacancies: Vacancy[];
}
