import { Injectable } from '@nestjs/common';
import { Transaction, TransactionRepository } from 'typeorm';

import { ICreateOrder, IGetOrderById, IUpdateOrder } from '@app/services/order';
import { OrderRepository } from '@app/repositories/order';
import { IOrder } from '@app/interfaces';

@Injectable()
export class OrderService {
  @Transaction()
  createOrder(
    order: ICreateOrder,
    @TransactionRepository() orderRep?: OrderRepository
  ): Promise<IOrder> {
    return orderRep.save(order);
  }

  @Transaction()
  getAllOrders(
    @TransactionRepository() orderRep?: OrderRepository
  ): Promise<IOrder[]> {
    return orderRep.getAll();
  }

  /* @todo getByVacancy and getByCustomer*/

  @Transaction()
  getOrder(
    { id }: IGetOrderById,
    @TransactionRepository() orderRep?: OrderRepository
  ): Promise<IOrder> {
    return orderRep.getById({ id });
  }

  @Transaction()
  updateOrder(
    { id }: IGetOrderById,
    order: IUpdateOrder,
    @TransactionRepository() orderRep?: OrderRepository
  ): Promise<IOrder> {
    return orderRep.save({ id, ...order });
  }

  @Transaction()
  deleteOrder(
    { id }: IGetOrderById,
    @TransactionRepository() orderRep?: OrderRepository
  ): Promise<IOrder> {
    return orderRep.softRemove({ id });
  }
}
