import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Transaction, TransactionRepository } from 'typeorm';

import { IGetAllSpecialistParam, ISpecialistResponse, SpecialistRepository } from '@app/repositories/specialist';
import { LocationRepository } from '@app/repositories/location';
import { ICreateSpecialist, IGetSpecialistById, IUpdateSpecialist, ILoginSpecialist, IUpdateToken } from '@app/services/specialist';
import { LocationService } from '@app/services/location';
import { ISpecialist } from '@app/interfaces';

@Injectable()
export class SpecialistService {
  constructor(private readonly locationService: LocationService) {}

  @Transaction()
  createSpecialist(
    newSpecialist: ICreateSpecialist,
    @TransactionRepository() specialistRep?: SpecialistRepository,
    @TransactionRepository() locationRep?: LocationRepository,
  ): Promise<ISpecialistResponse> {
    const location = this.locationService.getLocation({ id: newSpecialist.locationId }, locationRep);

    if (!location) {
      throw new HttpException('Местоположение не найдено', HttpStatus.BAD_REQUEST);
    }

    return specialistRep.save(newSpecialist);
  }

  @Transaction()
  getAllSpecialists(
    { locationId }: IGetAllSpecialistParam,
    @TransactionRepository() specialistRep?: SpecialistRepository
  ): Promise<ISpecialistResponse[]> {
    return specialistRep.getAll({ locationId });
  }

  @Transaction()
  getByPhoneOrEmail(
    { login }: ILoginSpecialist,
    @TransactionRepository() specialistRep?: SpecialistRepository
  ): Promise<ISpecialist> {
    return specialistRep.getByPhoneOrEmail({ login });
  }


  @Transaction()
  getSpecialist(
    { id }: IGetSpecialistById,
    @TransactionRepository() specialistRep?: SpecialistRepository
  ): Promise<ISpecialistResponse> {
    return specialistRep.getById({ id });
  }

  @Transaction()
  updateSpecialist(
    { id }: IGetSpecialistById,
    specialist: IUpdateSpecialist,
    @TransactionRepository() specialistRep?: SpecialistRepository,
    @TransactionRepository() locationRep?: LocationRepository,
  ): Promise<ISpecialistResponse> {
    const location = this.locationService.getLocation({ id: specialist.locationId }, locationRep);

    if (!location) {
      throw new HttpException('Местоположение не найдено', HttpStatus.BAD_REQUEST);
    }

    return specialistRep.save({ ...specialist, id });
  }

  @Transaction()
  updateToken(
    { id, token }: IUpdateToken,
    @TransactionRepository() specialistRep?: SpecialistRepository
  ): void {
    specialistRep.updateToken({ id, token });
  }

  @Transaction()
  deleteSpecialist(
    { id }: IGetSpecialistById,
    @TransactionRepository() specialistRep?: SpecialistRepository
  ): Promise<ISpecialistResponse> {
    return specialistRep.softRemove({ id });
  }
}
