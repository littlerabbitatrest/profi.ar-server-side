import { EntityRepository, Repository } from 'typeorm';

import { Specialist } from '@app/entities';
import { IGetById, ILogin, ISpecialistResponse, IGetAllSpecialistParam } from '@app/repositories/specialist';
import { ISpecialist } from '@app/interfaces';

@EntityRepository(Specialist)
export class SpecialistRepository extends Repository<Specialist> {
  getById({ id }: IGetById): Promise<ISpecialistResponse> {
    const query = this.createQueryBuilder('specialist')
      .leftJoin('specialist.location', 'location')
      .leftJoin('location.state', 'state')
      .leftJoin('specialist.vacancies', 'vacancy')
      .leftJoin('vacancy.category', 'category')
      .where('specialist.id =:id', { id })
      .select(['specialist.id', 'specialist.firstName', 'specialist.lastName', 'specialist.photoLink', 'specialist.email',
        'specialist.phone', 'vacancy.id', 'category.id', 'category.title', 'location.id', 'location.city', 'state.name']);

    return query.getOne();
  }

  getAll({ locationId }: IGetAllSpecialistParam): Promise<ISpecialistResponse[]> {
    const query = this.createQueryBuilder('specialist')
      .innerJoin('specialist.location', 'location')
      .innerJoin('location.state', 'state')
      .leftJoin('specialist.vacancies', 'vacancy')
      .innerJoin('vacancy.category', 'category');

    if (locationId) {
      query.where('specialist.location = :LocationId', { locationId });
    }

    query.select(['specialist.id', 'specialist.firstName', 'specialist.lastName', 'specialist.photoLink', 'specialist.email',
      'specialist.phone', 'vacancy.id', 'category.id', 'category.title', 'location.id', 'location.city', 'state.name']);

    return query.getMany();
  }

  getByPhoneOrEmail({ login }: ILogin): Promise<ISpecialist> {
    const query = this.createQueryBuilder('specialist')
      .where('specialist.phone = :login', { login })
      .orWhere('specialist.email = :login', { login })
      .select();

    return query.getOne();
  }
}
