import { EntityRepository, Repository } from 'typeorm';

import { Specialist } from '@app/entities';
import { IGetById, IAuthorization } from '@app/repositories/specialist';
import { ISpecialist } from '@app/interfaces';

@EntityRepository(Specialist)
export class SpecialistRepository extends Repository<Specialist> {
  getById({ id }: IGetById): Promise<ISpecialist> {
    const query = this.createQueryBuilder('specialist')
      .where('specialist.id =:id', { id })
      .select();

    return query.getOne();
  }

  getAll(): Promise<ISpecialist[]> {
    const query = this.createQueryBuilder('specialist').select();

    return query.getMany();
  }

  authorization({ login, password }: IAuthorization): Promise<ISpecialist> {
    const query = this.createQueryBuilder('specialist')
      .where('(specialist.phone = :login or specialist.email = :login) and specialist.password = :password', { login, password })
      .select();

    return query.getOne();
  }
}
