import { Injectable } from '@nestjs/common';
import { Transaction, TransactionRepository } from 'typeorm';

import { ICreateCustomerReview, IGetCustomerReviewById, IUpdateCustomerReview } from '@app/services/customer-review';
import { CustomerReviewRepository } from '@app/repositories/customer-review';
import { ICustomerReview } from '@app/interfaces';

@Injectable()
export class CustomerReviewService {
  @Transaction()
  createCustomerReview(
    customerReview: ICreateCustomerReview,
    @TransactionRepository() customerReviewRep?: CustomerReviewRepository
  ): Promise<ICustomerReview> {
    return customerReviewRep.save(customerReview);
  }

  @Transaction()
  getAllCustomerReviews(
    @TransactionRepository() customerReviewRep?: CustomerReviewRepository
  ): Promise<ICustomerReview[]> {
    return customerReviewRep.getAll();
  }

  /* @todo метод для просмотра комментариев определнного пользователя*/

  @Transaction()
  getCustomerReview(
    { id }: IGetCustomerReviewById,
    @TransactionRepository() customerReviewRep?: CustomerReviewRepository
  ): Promise<ICustomerReview> {
    return customerReviewRep.getById({ id });
  }

  @Transaction()
  updateCustomerReview(
    { id }: IGetCustomerReviewById,
    customerReview: IUpdateCustomerReview,
    @TransactionRepository() customerReviewRep?: CustomerReviewRepository
  ): Promise<ICustomerReview> {
    return customerReviewRep.save({ id, ...customerReview });
  }

  @Transaction()
  deleteCustomerReview(
    { id }: IGetCustomerReviewById,
  @TransactionRepository() customerReviewRep?: CustomerReviewRepository
  ): Promise<ICustomerReview> {
    return customerReviewRep.softRemove({ id });
  }
}
