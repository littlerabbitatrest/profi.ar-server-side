import { EntityRepository, Repository } from 'typeorm';

import { VacancyReview } from '@app/entities';
import { IVacancyReview } from '@app/interfaces';
import { IGetById } from '@app/repositories/vacancy-review';

@EntityRepository(VacancyReview)
export class VacancyReviewRepository extends Repository<VacancyReview> {
  getById({ id }: IGetById): Promise<IVacancyReview> {
    const query = this.createQueryBuilder('vacancyReview')
      .where('vacancyReview.id = :id', { id })
      .select();

    return query.getOne();
  }

  getAll(): Promise<IVacancyReview[]> {
    const query = this.createQueryBuilder('vacancyReview').select();

    return query.getMany();
  }
}
