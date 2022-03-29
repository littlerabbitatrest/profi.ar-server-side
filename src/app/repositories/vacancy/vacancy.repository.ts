import { EntityRepository, Repository } from 'typeorm';

import { Vacancy } from '@app/entities';
import { IGetById } from '@app/repositories/vacancy';
import { IVacancy } from '@app/interfaces';

@EntityRepository(Vacancy)
export class VacancyRepository extends Repository<Vacancy> {
  getById({ id }: IGetById): Promise<IVacancy> {
    const query = this.createQueryBuilder('vacancy')
      .where('vacancy.id = :id', { id })
      .select();

    return query.getOne();
  }

  getAll(): Promise<IVacancy[]> {
    const query = this.createQueryBuilder('vacancy').select();

    return query.getMany();
  }
}
