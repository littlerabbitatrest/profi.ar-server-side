import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Transaction, TransactionRepository } from 'typeorm';

import { IGetAllOrdersParam, OrderRepository } from '@app/repositories/order';
import { ICreateOrder, IGetOrderById, IUpdateOrder } from '@app/services/order';
import { CustomerService } from '@app/services/customer';
import { CategoryService } from '@app/services/category';
import { ScopeService } from '@app/services/scope';
import { VacancyService } from '@app/services/vacancy';
import { CustomerRepository } from '@app/repositories/customer';
import { CategoryRepository } from '@app/repositories/category';
import { ScopeRepository } from '@app/repositories/scope';
import { VacancyRepository } from '@app/repositories/vacancy';
import { IOrderResponse } from '@app/repositories/order/response';

@Injectable()
export class OrderService {
  constructor(
    private readonly customerService: CustomerService,
    private readonly categoryService: CategoryService,
    private readonly scopeService: ScopeService,
    private readonly vacancyService: VacancyService,
  ) {}

  @Transaction()
  async createOrder(
    order: ICreateOrder,
    @TransactionRepository() orderRep?: OrderRepository,
    @TransactionRepository() customerRep?: CustomerRepository,
    @TransactionRepository() categoryRep?: CategoryRepository,
    @TransactionRepository() scopeRep?: ScopeRepository,
  ): Promise<IOrderResponse> {
    const customer = await this.customerService.getCustomer({ id: order.customerId }, customerRep);
    const category = await this.categoryService.getCategory({ id: order.categoryId }, categoryRep);
    const scope = await this.scopeService.getScope({ id: order.scopeId }, scopeRep);

    if (!customer) {
      throw new HttpException('Клиент не найдено', HttpStatus.BAD_REQUEST);
    }

    if (!scope) {
      throw new HttpException('Сфера деятельности не найдена', HttpStatus.BAD_REQUEST);
    }

    if (!category || category.scope.id !== scope.id) {
      throw new HttpException('Категория не найдена', HttpStatus.BAD_REQUEST);
    }

    return orderRep.save(order);
  }

  @Transaction()
  getAllOrders(
    { categoryId, scopeId, vacancyId, customerId, locationId, statuses }: IGetAllOrdersParam,
    @TransactionRepository() orderRep?: OrderRepository
  ): Promise<IOrderResponse[]> {
    return orderRep.getAll({ categoryId, scopeId, vacancyId, customerId, locationId, statuses });
  }

  @Transaction()
  getOrder(
    { id }: IGetOrderById,
    @TransactionRepository() orderRep?: OrderRepository
  ): Promise<IOrderResponse> {
    return orderRep.getById({ id });
  }

  @Transaction()
  async updateOrder(
    { id }: IGetOrderById,
    order: IUpdateOrder,
    @TransactionRepository() orderRep?: OrderRepository,
    @TransactionRepository() vacancyRep?: VacancyRepository,
  ): Promise<IOrderResponse> {
    const vacancy = await this.vacancyService.getVacancy({ id: order.vacancyId }, vacancyRep);

    if (!vacancy) {
      throw new HttpException('Вакансия не найдена', HttpStatus.BAD_REQUEST);
    }

    return orderRep.save({ ...order, id });
  }

  @Transaction()
  deleteOrder(
    { id }: IGetOrderById,
    @TransactionRepository() orderRep?: OrderRepository
  ): Promise<IOrderResponse> {
    return orderRep.softRemove({ id });
  }
}
