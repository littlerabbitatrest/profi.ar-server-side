import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Transaction, TransactionRepository } from 'typeorm';

import { IGetAllLocationsParam, ILocationResponse, LocationRepository } from '@app/repositories/location';
import { StateRepository } from '@app/repositories/state';
import { ICreateLocation, IGetLocationById, IUpdateLocation } from '@app/services/location';
import { StateService } from '@app/services/state';

@Injectable()
export class LocationService {
  constructor(private readonly stateService: StateService) {}

  @Transaction()
  async createLocation(
    location: ICreateLocation,
    @TransactionRepository() locationRep?: LocationRepository,
    @TransactionRepository() stateRep?: StateRepository,
  ): Promise<ILocationResponse> {
    const state = await this.stateService.getState({ id: location.stateId }, stateRep);

    if (!state) {
      throw new HttpException('Провинция не найдена', HttpStatus.BAD_REQUEST);
    }

    return locationRep.save(location);
  }

  @Transaction()
  getAllLocations(
    { stateId }: IGetAllLocationsParam,
    @TransactionRepository() locationRep?: LocationRepository
  ): Promise<ILocationResponse[]> {
    return locationRep.getAll({ stateId });
  }

  @Transaction()
  getLocation(
    { id }: IGetLocationById,
    @TransactionRepository() locationRep?: LocationRepository
  ): Promise<ILocationResponse> {
    return locationRep.getById({ id });
  }

  @Transaction()
  async updateLocation(
    { id }: IGetLocationById,
    location: IUpdateLocation,
    @TransactionRepository() locationRep?: LocationRepository,
    @TransactionRepository() stateRep?: StateRepository,
  ): Promise<ILocationResponse> {
    const state = await this.stateService.getState({ id: location.stateId }, stateRep);

    if (!state) {
      throw new HttpException('Провинция не найдена', HttpStatus.BAD_REQUEST);
    }
    return locationRep.save({ ...location, id });
  }

  @Transaction()
  deleteLocation(
    { id }: IGetLocationById,
    @TransactionRepository() locationRep?: LocationRepository
  ): Promise<ILocationResponse> {
    return locationRep.softRemove({ id });
  }
}
