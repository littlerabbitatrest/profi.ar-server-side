import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Transaction, TransactionRepository } from 'typeorm';

import { IGetAllVacancyReviewParam, IVacancyReviewResponse, VacancyReviewRepository } from '@app/repositories/vacancy-review';
import { CustomerRepository } from '@app/repositories/customer';
import { VacancyRepository } from '@app/repositories/vacancy';
import { CustomerService } from '@app/services/customer';
import { VacancyService } from '@app/services/vacancy';
import { ICreateVacancyReview, IGetVacancyReviewById, IUpdateVacancyReview } from '@app/services/vacancy-review';

@Injectable()
export class VacancyReviewService {
  constructor(
    private readonly customerService: CustomerService,
    private readonly vacancyService: VacancyService
  ) {}

  @Transaction()
  createVacancyReview(
    vacancyReviews: ICreateVacancyReview,
    @TransactionRepository() vacancyReviewsRep?: VacancyReviewRepository,
    @TransactionRepository() customerRep?: CustomerRepository,
    @TransactionRepository() vacancyRep?: VacancyRepository,
  ): Promise<IVacancyReviewResponse> {
    const customer = this.customerService.getCustomer({ id: vacancyReviews.customerId }, customerRep);
    const vacancy = this.vacancyService.getVacancy({ id: vacancyReviews.vacancyId }, vacancyRep);

    if (!customer) {
      throw new HttpException('Клиент не найден', HttpStatus.BAD_REQUEST);
    }

    if (!vacancy) {
      throw new HttpException('Вакансия не найдена', HttpStatus.BAD_REQUEST);
    }

    return vacancyReviewsRep.save(vacancyReviews);
  }

  @Transaction()
  getAllVacancyReviews(
    { vacancyId }: IGetAllVacancyReviewParam,
    @TransactionRepository() vacancyReviewsRep?: VacancyReviewRepository
  ): Promise<IVacancyReviewResponse[]> {
    return vacancyReviewsRep.getAll({ vacancyId });
  }

  @Transaction()
  getVacancyReview(
    { id }: IGetVacancyReviewById,
    @TransactionRepository() vacancyReviewsRep?: VacancyReviewRepository
  ): Promise<IVacancyReviewResponse> {
    return vacancyReviewsRep.getById({ id });
  }

  @Transaction()
  updateVacancyReview(
    { id }: IGetVacancyReviewById,
    vacancyReviews: IUpdateVacancyReview,
    @TransactionRepository() vacancyReviewsRep?: VacancyReviewRepository
  ): Promise<IVacancyReviewResponse> {
    return vacancyReviewsRep.save({ ...vacancyReviews, id });
  }

  @Transaction()
  deleteVacancyReview(
    { id }: IGetVacancyReviewById,
    @TransactionRepository() vacancyReviewsRep?: VacancyReviewRepository
  ): Promise<IVacancyReviewResponse> {
    return vacancyReviewsRep.softRemove({ id });
  }
}
