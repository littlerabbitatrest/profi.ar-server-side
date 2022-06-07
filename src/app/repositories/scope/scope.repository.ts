import { EntityRepository, Repository } from 'typeorm';

import { Scope } from '@app/entities';
import { IGetById } from '@app/repositories/scope';
import { IScope } from '@app/interfaces';

@EntityRepository(Scope)
export class ScopeRepository extends Repository<Scope> {
  getById({ id }: IGetById): Promise<IScope> {
    const query = this.createQueryBuilder('scope')
      .where('scope.id = :id', { id })
      .select();

    return query.getOne();
  }

  getAll(): Promise<IScope[]> {
    const query = this.createQueryBuilder('scope').select();

    return query.getMany();
  }
}
