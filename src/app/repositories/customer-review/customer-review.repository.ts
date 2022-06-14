import { EntityRepository, Repository } from 'typeorm';

import { CustomerReview } from '@app/entities';
import {
  IGetAllCustomerReviewsParam,
  IGetByIdParam,
  ICustomerReviewResponse,
  IAverageScoreParam
} from '@app/repositories/customer-review';

@EntityRepository(CustomerReview)
export class CustomerReviewRepository extends Repository<CustomerReview> {
  getById({ id }: IGetByIdParam): Promise<ICustomerReviewResponse> {
    const query = this.createQueryBuilder('customerReview')
      .innerJoin('customerReview.vacancy', 'vacancy')
      .innerJoin('customerReview.customer', 'customer')
      .innerJoin('customerReview.specialist', 'specialist')
      .innerJoin('vacancy.category', 'category')
      .where('customerReview.id = :id', { id })
      .select(['customerReview.id', 'customerReview.description', 'customerReview.rate', 'vacancy.id', 'category.title',
        'specialist.id', 'specialist.firstName', 'specialist.lastName', 'specialist.photoLink', 'customer.id',
        'customer.firstName', ' customer.lastName', 'customer.photoLink']);

    return query.getOne();
  }

  getAll({ customerId }: IGetAllCustomerReviewsParam): Promise<ICustomerReviewResponse[]> {
    const query = this.createQueryBuilder('customerReview')
      .innerJoin('customerReview.vacancy', 'vacancy')
      .innerJoin('customerReview.customer', 'customer')
      .innerJoin('customerReview.specialist', 'specialist')
      .innerJoin('vacancy.category', 'category');

    if (customerId) query.where('customerReview.customer = :customerId', { customerId });


    query.select(['customerReview.id', 'customerReview.description', 'customerReview.rate', 'vacancy.id', 'category.title',
      'specialist.id', 'specialist.firstName', 'specialist.lastName', 'specialist.photoLink', 'customer.id',
      'customer.firstName', ' customer.lastName', 'customer.photoLink']);

    return query.getMany();
  }

  calcAverageScore({ customerId }: IAverageScoreParam): Promise<number> {
    const query = this.createQueryBuilder('customerReview')
      .where('customerReview.customer = :customerId', { customerId })
      .limit(20)
      .select('AVG(customerReview.rate)');

    return query.getRawOne();
  }
}
