import { EntityRepository, Repository } from 'typeorm';

import { Order } from '@app/entities';
import { IGetById } from '@app/repositories/order';
import { IGetAllOrdersParam } from '@app/repositories/order';
import { IOrderResponse } from '@app/repositories/order/response';

@EntityRepository(Order)
export class OrderRepository extends Repository<Order> {
  getById({ id }: IGetById): Promise<IOrderResponse> {
    const query = this.createQueryBuilder('order')
      .innerJoin('order.customer', 'customer')
      .leftJoin('order.vacancy', 'vacancy')
      .innerJoin('order.scope', 'scope')
      .innerJoin('order.category', 'category')
      .innerJoin('vacancy.specialist', 'specialist')
      .where('order.id= :id', { id })
      .select(['order', 'customer.id', 'customer.firstName', 'customer.lastName', 'customer.photoLink', 'vacancy.id',
        'specialist.id', 'specialist.firstName', 'specialist.lastName', 'specialist.photoLink', 'scope.id', 'scope.name',
        'category.id', 'category.title']);

    return query.getOne();
  }

  getAll({ customerId, scopeId, vacancyId, categoryId, locationId, statuses }: IGetAllOrdersParam): Promise<IOrderResponse[]> {
    const query = this.createQueryBuilder('order')
      .innerJoin('order.customer', 'customer')
      .leftJoin('order.vacancy', 'vacancy')
      .innerJoin('order.scope', 'scope')
      .innerJoin('order.category', 'category')
      .innerJoin('vacancy.specialist', 'specialist');

    switch (true) {
      case Boolean(scopeId):
        query.andWhere('order.score = :scopeId', { scopeId });
      case Boolean(vacancyId):
        query.andWhere('order.vacancy = :vacancyId', { vacancyId });
      case Boolean(customerId):
        query.andWhere('order.customer = :customerId', { customerId });
      case Boolean(categoryId):
        query.andWhere('order.category = :categoryId', { categoryId });
      case Boolean(locationId):
        query.andWhere('customer.location = :locationId', { locationId });
      case statuses.length > 0: query.andWhere('order.status in (:...statuses)', { statuses });
      default:
        break;
    }

    query.select(['order', 'customer.id', 'customer.firstName', 'customer.lastName', 'customer.photoLink', 'vacancy.id',
      'specialist.id', 'specialist.firstName', 'specialist.lastName', 'specialist.photoLink', 'scope.id', 'scope.name',
      'category.id', 'category.title']);

    return query.getMany();
  }
}
