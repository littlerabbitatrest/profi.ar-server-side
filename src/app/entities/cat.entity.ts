import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseEntity } from '@nonameteam/core';

import { ICat } from '@app/interfaces';
import { Man } from '@app/entities';

@Entity({ name: 'Cats' })
export class Cat extends BaseEntity implements ICat {
  @Column({ type: 'varchar', length: 100 })
  name: string;

  @ManyToOne(() => Man, man => man.cats, { onDelete: 'CASCADE' })
  man: Man;
}
