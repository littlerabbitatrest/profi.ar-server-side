import { EntityRepository, Repository } from 'typeorm';

import { Vacancy } from '@app/entities';
import { IGetById, IVacancyResponse } from '@app/repositories/vacancy';
import { IGetAllVacancyParam } from '@app/repositories/vacancy/params/get-all-vacancy.param';

@EntityRepository(Vacancy)
export class VacancyRepository extends Repository<Vacancy> {
  getById({ id }: IGetById): Promise<IVacancyResponse> {
    const query = this.createQueryBuilder('vacancy')
      .innerJoin('vacancy.specialist', 'specialist')
      .innerJoin('vacancy.scope', 'scope')
      .innerJoin('vacancy.category', 'category')
      .where('vacancy.id = :id', { id })
      .select(['vacancy', 'specialist.id', 'specialist.firstName', 'specialist.lastName', 'specialist.photoLink',
        'scope.id', 'scope.name', 'category.id', 'category.title']);

    return query.getOne();
  }

  getAll(
    { scopeId, specialistId, categoryId }: IGetAllVacancyParam
  ): Promise<IVacancyResponse[]> {
    const query = this.createQueryBuilder('vacancy')
      .innerJoin('vacancy.specialist', 'specialist')
      .innerJoin('vacancy.scope', 'scope')
      .innerJoin('vacancy.category', 'category')
      .where('1=1');

    if (scopeId) {
      query.andWhere('vacancy.scope = :scopeId', { scopeId });
    }

    if (categoryId) {
      query.andWhere('vacancy.category = :categoryId', { categoryId });
    }

    if (specialistId) {
      query.andWhere('vacancy.specialist = :specialistId', { specialistId });
    }

    query.select(['vacancy', 'specialist.id', 'specialist.firstName', 'specialist.lastName', 'specialist.photoLink',
      'scope.id', 'scope.name', 'category.id', 'category.title']);

    return query.getMany();
  }
}
