import { EntityRepository, Repository } from 'typeorm';

import { Man } from '@app/entities';

@EntityRepository(Man)
export class ManRepository extends Repository<Man> {}
