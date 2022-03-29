import { EntityRepository, Repository } from 'typeorm';

import { Location } from '@app/entities';
import { IGetById } from '@app/repositories/location';
import { ILocation } from '@app/interfaces';

@EntityRepository(Location)
export class LocationRepository extends Repository<Location> {
  getById({ id }: IGetById): Promise<ILocation> {
    const query = this.createQueryBuilder('location')
      .where('location.id = :id', { id })
      .select();
    return query.getOne();
  }

  getAll(): Promise<ILocation[]> {
    const query = this.createQueryBuilder('location').select();

    return query.getMany();
  }
}
