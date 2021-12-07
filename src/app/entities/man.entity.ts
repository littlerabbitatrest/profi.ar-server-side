import { Column, Entity, OneToMany } from 'typeorm';
import { BaseEntity } from '@nonameteam/core';

import { IMan } from '@app/interfaces';
import { Cat } from '@app/entities';

@Entity({ name: 'Men' })
export class Man extends BaseEntity implements IMan {
  @Column({ type: 'varchar', length: 100 })
  name: string;

  @Column({ type: 'smallint' })
  age: number;

  @OneToMany(() => Cat, cat => cat.man, { cascade: true })
  cats: Cat[];
}
