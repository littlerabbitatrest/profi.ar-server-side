import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Transaction, TransactionRepository } from 'typeorm';

import { ICreateVacancy, IGetVacancyById, IUpdateVacancy } from '@app/services/vacancy';
import { SpecialistRepository } from '@app/repositories/specialist';
import { ScopeRepository } from '@app/repositories/scope';
import { CategoryRepository } from '@app/repositories/category';
import { IVacancyResponse, VacancyRepository, IGetAllVacancyParam } from '@app/repositories/vacancy';
import { SpecialistService } from '@app/services/specialist';
import { ScopeService } from '@app/services/scope';
import { CategoryService } from '@app/services/category';

@Injectable()
export class VacancyService {
  constructor(
    private readonly specialistService: SpecialistService,
    private readonly scopeService: ScopeService,
    private readonly categoryService: CategoryService,
  ) {}

  @Transaction()
  async createVacancy(
    vacancy: ICreateVacancy,
    @TransactionRepository() vacancyRep?: VacancyRepository,
    @TransactionRepository() specialistRep?: SpecialistRepository,
    @TransactionRepository() scopeRep?: ScopeRepository,
    @TransactionRepository() categoryRep?: CategoryRepository,
  ): Promise<IVacancyResponse> {
    const specialist = await this.specialistService.getSpecialist({ id: vacancy.specialistId }, specialistRep);
    const scope = await this.scopeService.getScope({ id: vacancy.scopeId }, scopeRep);
    const category = await this.categoryService.getCategory({ id: vacancy.categoryId }, categoryRep);

    if (!specialist) {
      throw new HttpException('Специалист не найден', HttpStatus.BAD_REQUEST);
    }

    if (!scope) {
      throw new HttpException('Сфера деятельности не найдена', HttpStatus.BAD_REQUEST);
    }

    if (!category || category.scope.id !== scope.id) {
      throw new HttpException('Категория не найдена', HttpStatus.BAD_REQUEST);
    }

    return vacancyRep.save(vacancy);
  }

  @Transaction()
  getAllVacancies(
    { specialistId, categoryId, scopeId, locationId }: IGetAllVacancyParam,
    @TransactionRepository() vacancyRep?: VacancyRepository
  ): Promise<IVacancyResponse[]> {
    return vacancyRep.getAll({ specialistId, categoryId, scopeId, locationId });
  }

  @Transaction()
  getVacancy(
    { id }: IGetVacancyById,
    @TransactionRepository() vacancyRep?: VacancyRepository
  ): Promise<IVacancyResponse> {
    return vacancyRep.getById({ id });
  }

  @Transaction()
  updateVacancy(
    { id }: IGetVacancyById,
    vacancy: IUpdateVacancy,
    @TransactionRepository() vacancyRep?: VacancyRepository
  ): Promise<IVacancyResponse> {
    return vacancyRep.save({ id, ...vacancy });
  }

  @Transaction()
  deleteVacancy(
    { id }: IGetVacancyById,
    @TransactionRepository() vacancyRep?: VacancyRepository
  ): Promise<IVacancyResponse> {
    return vacancyRep.softRemove({ id });
  }
}
