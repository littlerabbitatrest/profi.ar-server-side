import { Injectable } from '@nestjs/common';
import { Transaction, TransactionRepository } from 'typeorm';

import { ICreateVacancy, IGetVacancyById, IUpdateVacancy } from '@app/services/vacancy';
import { VacancyRepository } from '@app/repositories/vacancy';
import { IVacancy } from '@app/interfaces';

@Injectable()
export class VacancyService {
  @Transaction()
  createVacancy(
    vacancy: ICreateVacancy,
    @TransactionRepository() vacancyRep?: VacancyRepository
  ): Promise<IVacancy> {
    return vacancyRep.save(vacancy);
  }

  @Transaction()
  getAllVacancies(
    @TransactionRepository() vacancyRep?: VacancyRepository
  ): Promise<IVacancy[]> {
    return vacancyRep.getAll();
  }

  @Transaction()
  getVacancy(
    { id }: IGetVacancyById,
    @TransactionRepository() vacancyRep?: VacancyRepository
  ): Promise<IVacancy> {
    return vacancyRep.getById({ id });
  }

  @Transaction()
  updateVacancy(
    { id }: IGetVacancyById,
    vacancy: IUpdateVacancy,
    @TransactionRepository() vacancyRep?: VacancyRepository
  ): Promise<IVacancy> {
    return vacancyRep.save({ id, ...vacancy });
  }

  @Transaction()
  deleteVacancy(
    { id }: IGetVacancyById,
    @TransactionRepository() vacancyRep?: VacancyRepository
  ): Promise<IVacancy> {
    return vacancyRep.softRemove({ id });
  }
}
