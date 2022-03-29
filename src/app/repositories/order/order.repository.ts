import { EntityRepository, Repository } from 'typeorm';

import { Order } from '@app/entities';
import { IGetById } from '@app/repositories/order';
import { IOrder } from '@app/interfaces';

@EntityRepository(Order)
export class OrderRepository extends Repository<Order> {
  getById({ id }: IGetById): Promise<IOrder> {
    const query = this.createQueryBuilder('order')
      .where('order.id= :id', { id })
      .select();

    return query.getOne();
  }

  getAll(): Promise<IOrder[]> {
    const query = this.createQueryBuilder('order').select();

    return query.getMany();
  }
}
