import { BaseEntity } from '@nonameteam/core';
import { Column, Entity, ManyToMany, ManyToOne } from 'typeorm';

import { ICategory } from '@app/interfaces';
import { Scope, Vacancy } from '@app/entities';

@Entity({ name: 'Categories' })
export class Category extends BaseEntity implements ICategory {
  @Column({ type: 'varchar', length: 100 })
    title: string;

  @ManyToOne(() => Scope, scope => scope.categories, { onDelete: 'CASCADE' })
    scope: Scope;

  @ManyToMany(() => Vacancy, vacancy => vacancy.categories)
    vacancies: Vacancy[];
}
