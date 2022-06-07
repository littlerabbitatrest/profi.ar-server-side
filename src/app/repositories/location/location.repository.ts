import { EntityRepository, Repository } from 'typeorm';

import { Location } from '@app/entities';
import { ILocationResponse, IGetByIdParam, IGetAllLocationsParam } from '@app/repositories/location';


@EntityRepository(Location)
export class LocationRepository extends Repository<Location> {
  getById({ id }: IGetByIdParam): Promise<ILocationResponse> {
    const query = this.createQueryBuilder('location')
      .innerJoin('location.state', 'state')
      .where('location.id = :id', { id })
      .select(['location.id', 'location.city', 'state.id', 'state.name']);
    return query.getOne();
  }

  getAll({ stateId }: IGetAllLocationsParam): Promise<ILocationResponse[]> {
    const query = this.createQueryBuilder('location')
      .innerJoin('location.state', 'state');

    if (stateId) {
      query.where('location.state = :stateId', { stateId });
    }

    query.select(['location.id', 'location.city', 'state.id', 'state.name']);

    return query.getMany();
  }
}
