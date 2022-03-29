import { Injectable } from '@nestjs/common';
import { Transaction, TransactionRepository } from 'typeorm';

import { IAuthorizationCustomer, ICreateCustomer, IGetCustomerById, IUpdateCustomer } from '@app/services/customer';
import { CustomerRepository } from '@app/repositories/customer';
import { ICustomer } from '@app/interfaces';

@Injectable()
export class CustomerService {
  @Transaction()
  createCustomer(
    customer: ICreateCustomer,
    @TransactionRepository() customerRep?: CustomerRepository
  ): Promise<ICustomer> {
    return customerRep.save(customer);
  }

  @Transaction()
  getAllCustomers(
    @TransactionRepository() customerRep?: CustomerRepository
  ): Promise<ICustomer[]> {
    return customerRep.getAll();
  }

  @Transaction()
  getCustomer(
    { id }: IGetCustomerById,
    @TransactionRepository() customerRep?: CustomerRepository
  ): Promise<ICustomer> {
    return customerRep.getById({ id });
  }

  @Transaction()
  authorizationCustomer(
    { login, password }: IAuthorizationCustomer,
    @TransactionRepository() customerRep?: CustomerRepository
  ): Promise<ICustomer> {
    return customerRep.authorization({ login, password });
  }

  @Transaction()
  updateCustomer(
    { id }: IGetCustomerById,
    customer: IUpdateCustomer,
    @TransactionRepository() customerRep?: CustomerRepository
  ): Promise<ICustomer> {
    return customerRep.save({ id, ...customer });
  }

  @Transaction()
  deleteCustomer(
    { id }: IGetCustomerById,
    @TransactionRepository() customerRep?: CustomerRepository
  ): Promise<ICustomer> {
    return customerRep.softRemove({ id });
  }
}
