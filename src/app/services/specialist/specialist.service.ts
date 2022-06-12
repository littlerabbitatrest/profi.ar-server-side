import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Transaction, TransactionRepository } from 'typeorm';

import { IGetAllSpecialistParam, ISpecialistResponse, SpecialistRepository } from '@app/repositories/specialist';
import { LocationRepository } from '@app/repositories/location';
import { ICreateSpecialist, IGetSpecialistById, IUpdateSpecialist, ILoginSpecialist } from '@app/services/specialist';
import { LocationService } from '@app/services/location';
import { ISpecialist } from '@app/interfaces';

@Injectable()
export class SpecialistService {
  constructor(private readonly locationService: LocationService) {}

  @Transaction()
  async createSpecialist(
    specialist: ICreateSpecialist,
    @TransactionRepository() specialistRep?: SpecialistRepository,
    @TransactionRepository() locationRep?: LocationRepository,
  ): Promise<ISpecialistResponse> {
    const location = await this.locationService.getLocation({ id: specialist.locationId }, locationRep);

    if (!location) {
      throw new HttpException('Местоположение не найдено', HttpStatus.BAD_REQUEST);
    }

    const { id } = await specialistRep.save(specialist);

    return specialistRep.getById({ id });
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
  deleteSpecialist(
    { id }: IGetSpecialistById,
    @TransactionRepository() specialistRep?: SpecialistRepository
  ): Promise<ISpecialistResponse> {
    return specialistRep.softRemove({ id });
  }
}
