import { EntityRepository, Repository } from 'typeorm';

import { IGetById, IStateResponse } from '@app/repositories/state';
import { State } from '@app/entities';

@EntityRepository(State)
export class StateRepository extends Repository<State> {
  getById({ id }: IGetById): Promise<IStateResponse> {
    const query = this.createQueryBuilder('state')
      .where('state.id = :id', { id })
      .select();

    return query.getOne();
  }

  getAll(): Promise<IStateResponse[]> {
    const query = this.createQueryBuilder('state').select();

    return query.getMany();
  }
}
