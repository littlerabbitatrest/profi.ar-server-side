import { EntityRepository, Repository } from 'typeorm';

import { IGetById } from '@app/repositories/state';
import { State } from '@app/entities';
import { IState } from '@app/interfaces';

@EntityRepository(State)
export class StateRepository extends Repository<State> {
  getById({ id }: IGetById): Promise<IState> {
    const query = this.createQueryBuilder('state')
      .where('state.id = :id', { id })
      .select();

    return query.getOne();
  }

  getAll(): Promise<IState[]> {
    const query = this.createQueryBuilder('state').select();

    return query.getMany();
  }
}
