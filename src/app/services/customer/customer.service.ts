import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Transaction, TransactionRepository } from 'typeorm';

import { ICustomer } from '@app/interfaces';
import { CustomerRepository, IGetAllCustomersParam, ICustomerResponse } from '@app/repositories/customer';
import { LocationRepository } from '@app/repositories/location';
import {
  ICreateCustomer,
  IGetCustomerById,
  ILoginCustomer,
  IUpdateCustomer,
  IUpdateToken
} from '@app/services/customer';
import { LocationService } from '@app/services/location';

@Injectable()
export class CustomerService {
  constructor(private readonly locationService: LocationService) {}

  @Transaction()
  createCustomer(
    customer: ICreateCustomer,
    @TransactionRepository() customerRep?: CustomerRepository,
    @TransactionRepository() locationRep?: LocationRepository,
  ): Promise<ICustomerResponse> {
    const location = this.locationService.getLocation({ id: customer.locationId }, locationRep);

    if (!location) {
      throw new HttpException('Местоположение не найдено', HttpStatus.BAD_REQUEST);
    }

    return customerRep.save(customer);
  }

  @Transaction()
  getAllCustomers(
    { locationId }: IGetAllCustomersParam,
    @TransactionRepository() customerRep?: CustomerRepository
  ): Promise<ICustomerResponse[]> {
    return customerRep.getAll({ locationId });
  }

  @Transaction()
  getByPhoneOrEmail(
    { login }: ILoginCustomer,
    @TransactionRepository() customerRep?: CustomerRepository
  ): Promise<ICustomer> {
    return customerRep.getByPhoneOrEmail({ login });
  }

  @Transaction()
  getCustomer(
    { id }: IGetCustomerById,
    @TransactionRepository() customerRep?: CustomerRepository
  ): Promise<ICustomerResponse> {
    return customerRep.getById({ id });
  }

  @Transaction()
  updateCustomer(
    { id }: IGetCustomerById,
    customer: IUpdateCustomer,
    @TransactionRepository() customerRep?: CustomerRepository,
    @TransactionRepository() locationRep?: LocationRepository,
  ): Promise<ICustomerResponse> {
    const location = this.locationService.getLocation({ id: customer.locationId }, locationRep);

    if (!location) {
      throw new HttpException('Местоположение не найдено', HttpStatus.BAD_REQUEST);
    }

    return customerRep.save({ id, ...customer });
  }

  @Transaction()
  updateToken(
    { id, token }: IUpdateToken,
    @TransactionRepository() customerRep?: CustomerRepository
  ): void {
    customerRep.updateToken({ id, token });
  }

  @Transaction()
  deleteCustomer(
    { id }: IGetCustomerById,
    @TransactionRepository() customerRep?: CustomerRepository
  ): Promise<ICustomer> {
    return customerRep.softRemove({ id });
  }
}
