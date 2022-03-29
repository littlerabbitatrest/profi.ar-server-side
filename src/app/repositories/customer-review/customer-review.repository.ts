import { EntityRepository, Repository } from 'typeorm';

import { CustomerReview } from '@app/entities';
import { ICustomerReview } from '@app/interfaces';
import { IGetById } from '@app/repositories/customer-review';

@EntityRepository(CustomerReview)
export class CustomerReviewRepository extends Repository<CustomerReview> {
  getById({ id }: IGetById): Promise<ICustomerReview> {
    const query = this.createQueryBuilder('customerReview')
      .where('customerReview.id = :id', { id })
      .select();

    return query.getOne();
  }

  getAll(): Promise<ICustomerReview[]> {
    const query = this.createQueryBuilder('customerReview').select();

    return query.getMany();
  }
}
