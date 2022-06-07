import { EntityRepository, Repository } from 'typeorm';

import { VacancyReview } from '@app/entities';
import { IGetAllVacancyReviewParam, IGetByIdParam, IVacancyReviewResponse } from '@app/repositories/vacancy-review';

@EntityRepository(VacancyReview)
export class VacancyReviewRepository extends Repository<VacancyReview> {
  getById({ id }: IGetByIdParam): Promise<IVacancyReviewResponse> {
    const query = this.createQueryBuilder('vacancyReview')
      .innerJoin('vacancyReview.vacancy', 'vacancy')
      .innerJoin('vacancyReview.customer', 'customer')
      .where('vacancyReview.id = :id', { id })
      .select(['vacancyReview.id', 'vacancyReview.rate', 'vacancyReview.description', 'vacancy.id',
        'customer.id', 'customer.firstName', 'customer.lastName', 'customer.photoLink']);

    return query.getOne();
  }

  getAll({ vacancyId }: IGetAllVacancyReviewParam): Promise<IVacancyReviewResponse[]> {
    const query = this.createQueryBuilder('vacancyReview')
      .innerJoin('vacancyReview.vacancy', 'vacancy')
      .innerJoin('vacancyReview.customer', 'customer');

    if (vacancyId) {
      query.where('vacancyReview.vacancy = :vacancyId', { vacancyId });
    }

    query.select(['vacancyReview.id', 'vacancyReview.rate', 'vacancyReview.description', 'vacancy.id',
      'customer.id', 'customer.firstName', 'customer.lastName', 'customer.photoLink']);


    return query.getMany();
  }
}
