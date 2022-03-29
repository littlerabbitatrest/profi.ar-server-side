import { Injectable } from '@nestjs/common';
import { Transaction, TransactionRepository } from 'typeorm';

import { ICreateLocation, IGetLocationById, IUpdateLocation } from '@app/services/location';
import { LocationRepository } from '@app/repositories/location';
import { ILocation } from '@app/interfaces';

@Injectable()
export class LocationService {
  @Transaction()
  createLocation(
    location: ICreateLocation,
    @TransactionRepository() locationRep?: LocationRepository
  ): Promise<ILocation> {
    return locationRep.save(location);
  }

  @Transaction()
  getAllLocations(
    @TransactionRepository() locationRep?: LocationRepository
  ): Promise<ILocation[]> {
    return locationRep.getAll();
  }

  @Transaction()
  getLocation(
    { id }: IGetLocationById,
    @TransactionRepository() locationRep?: LocationRepository
  ): Promise<ILocation> {
    return locationRep.getById({ id });
  }

  @Transaction()
  updateLocation(
    { id }: IGetLocationById,
    location: IUpdateLocation,
    @TransactionRepository() locationRep?: LocationRepository
  ): Promise<ILocation> {
    return locationRep.save({ id, ...location });
  }

  @Transaction()
  deleteLocation(
    { id }: IGetLocationById,
    @TransactionRepository() locationRep?: LocationRepository
  ): Promise<ILocation> {
    return locationRep.softRemove({ id });
  }
}
