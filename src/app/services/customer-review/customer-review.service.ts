import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Transaction, TransactionRepository } from 'typeorm';

import { CustomerReviewRepository, ICustomerReviewResponse, IGetAllCustomerReviewsParam } from '@app/repositories/customer-review';
import { CustomerRepository } from '@app/repositories/customer';
import { SpecialistRepository } from '@app/repositories/specialist';
import { VacancyRepository } from '@app/repositories/vacancy';
import { ICreateCustomerReview, IGetCustomerReviewById, IUpdateCustomerReview } from '@app/services/customer-review';
import { CustomerService } from '@app/services/customer';
import { SpecialistService } from '@app/services/specialist';
import { VacancyService } from '@app/services/vacancy';

@Injectable()
export class CustomerReviewService {
  constructor(
    private readonly specialistService: SpecialistService,
    private readonly vacancyService: VacancyService,
    private readonly customerService: CustomerService
  ) {}

  @Transaction()
  async createCustomerReview(
    customerReview: ICreateCustomerReview,
    @TransactionRepository() customerReviewRep?: CustomerReviewRepository,
    @TransactionRepository() customerRep?: CustomerRepository,
    @TransactionRepository() specialistRep?: SpecialistRepository,
    @TransactionRepository() vacancyRep?: VacancyRepository,
  ): Promise<ICustomerReviewResponse> {
    const customer = await this.customerService.getCustomer({ id: customerReview.customerId }, customerRep);
    const specialist = await this.specialistService.getSpecialist({ id: customerReview.specialistId }, specialistRep);
    const vacancy = await this.vacancyService.getVacancy({ id: customerReview.vacancyId }, vacancyRep);

    if (!customer) {
      throw new HttpException('Клиент не найден', HttpStatus.BAD_REQUEST);
    }

    if (!specialist) {
      throw new HttpException('Специалист не найден', HttpStatus.BAD_REQUEST);
    }

    if (!vacancy || vacancy.specialist.id !== specialist.id) {
      throw new HttpException('Вакансия не найдена', HttpStatus.BAD_REQUEST);
    }
    const avdScore = await customerReviewRep.calcAverageScore({ customerId: customerReview.customerId });

    await this.customerService.updateCustomer(
      { id: customer.id },
      { ...customer, commonRate: avdScore, locationId: customer.location.id },
      customerRep
    );

    return customerReviewRep.save(customerReview);
  }

  @Transaction()
  getAllCustomerReviews(
    { customerId }: IGetAllCustomerReviewsParam,
    @TransactionRepository() customerReviewRep?: CustomerReviewRepository
  ): Promise<ICustomerReviewResponse[]> {
    return customerReviewRep.getAll({ customerId });
  }

  @Transaction()
  getCustomerReview(
    { id }: IGetCustomerReviewById,
    @TransactionRepository() customerReviewRep?: CustomerReviewRepository
  ): Promise<ICustomerReviewResponse> {
    return customerReviewRep.getById({ id });
  }

  @Transaction()
  updateCustomerReview(
    { id }: IGetCustomerReviewById,
    customerReview: IUpdateCustomerReview,
    @TransactionRepository() customerReviewRep?: CustomerReviewRepository
  ): Promise<ICustomerReviewResponse> {
    return customerReviewRep.save({ ...customerReview, id });
  }

  @Transaction()
  deleteCustomerReview(
    { id }: IGetCustomerReviewById,
  @TransactionRepository() customerReviewRep?: CustomerReviewRepository
  ): Promise<ICustomerReviewResponse> {
    return customerReviewRep.softRemove({ id });
  }
}
