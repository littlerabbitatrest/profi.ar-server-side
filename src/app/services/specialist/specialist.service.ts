import { Injectable } from '@nestjs/common';
import { Transaction, TransactionRepository } from 'typeorm';

import {
  IAuthorizationSpecialist,
  ICreateSpecialist,
  IGetSpecialistById,
  IUpdateSpecialist
} from '@app/services/specialist';
import { SpecialistRepository } from '@app/repositories/specialist';
import { ISpecialist } from '@app/interfaces';

@Injectable()
export class SpecialistService {
  @Transaction()
  createSpecialist(
    specialist: ICreateSpecialist,
    @TransactionRepository() specialistRep?: SpecialistRepository
  ): Promise<ISpecialist> {
    return specialistRep.save(specialist);
  }

  @Transaction()
  getAllSpecialists(
    @TransactionRepository() specialistRep?: SpecialistRepository
  ): Promise<ISpecialist[]> {
    return specialistRep.getAll();
  }

  @Transaction()
  getSpecialist(
    { id }: IGetSpecialistById,
    @TransactionRepository() specialistRep?: SpecialistRepository
  ): Promise<ISpecialist> {
    return specialistRep.getById({ id });
  }

  @Transaction()
  authorizationSpecialist(
    { login, password }: IAuthorizationSpecialist,
    @TransactionRepository() specialistRep?: SpecialistRepository
  ): Promise<ISpecialist> {
    return specialistRep.authorization({ login, password });
  }

  @Transaction()
  updateSpecialist(
    { id }: IGetSpecialistById,
    specialist: IUpdateSpecialist,
    @TransactionRepository() specialistRep?: SpecialistRepository
  ): Promise<ISpecialist> {
    return specialistRep.save({ id, ...specialist });
  }

  @Transaction()
  deleteSpecialist(
    { id }: IGetSpecialistById,
    @TransactionRepository() specialistRep?: SpecialistRepository
  ): Promise<ISpecialist> {
    return specialistRep.softRemove({ id });
  }
}
