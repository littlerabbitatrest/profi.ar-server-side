import { Injectable } from '@nestjs/common';
import { Transaction, TransactionRepository } from 'typeorm';

import { ICreateVacancyReview, IGetVacancyReviewById, IUpdateVacancyReview } from '@app/services/vacancy-review';
import { VacancyReviewRepository } from '@app/repositories/vacancy-review';
import { IVacancyReview } from '@app/interfaces';

@Injectable()
export class VacancyReviewService {
  @Transaction()
  createVacancyReview(
    vacancyReviews: ICreateVacancyReview,
    @TransactionRepository() vacancyReviewsRep?: VacancyReviewRepository
  ): Promise<IVacancyReview> {
    return vacancyReviewsRep.save(vacancyReviews);
  }

  @Transaction()
  getAllVacancyReviews(
    @TransactionRepository() vacancyReviewsRep?: VacancyReviewRepository
  ): Promise<IVacancyReview[]> {
    return vacancyReviewsRep.getAll();
  }

  @Transaction()
  getVacancyReview(
    { id }: IGetVacancyReviewById,
    @TransactionRepository() vacancyReviewsRep?: VacancyReviewRepository
  ): Promise<IVacancyReview> {
    return vacancyReviewsRep.getById({ id });
  }

  @Transaction()
  updateVacancyReview(
    { id }: IGetVacancyReviewById,
    vacancyReviews: IUpdateVacancyReview,
    @TransactionRepository() vacancyReviewsRep?: VacancyReviewRepository
  ): Promise<IVacancyReview> {
    return vacancyReviewsRep.save({ id, ...vacancyReviews });
  }

  @Transaction()
  deleteVacancyReview(
    { id }: IGetVacancyReviewById,
    @TransactionRepository() vacancyReviewsRep?: VacancyReviewRepository
  ): Promise<IVacancyReview> {
    return vacancyReviewsRep.softRemove({ id });
  }
}
