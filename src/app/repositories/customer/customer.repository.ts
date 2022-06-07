import { EntityRepository, Repository } from 'typeorm';

import { Customer } from '@app/entities';
import { ICustomer } from '@app/interfaces';
import { ILogin, IGetById, IUpdateToken, IGetAllCustomersParam, ICustomerResponse } from '@app/repositories/customer';

@EntityRepository(Customer)
export class CustomerRepository extends Repository<Customer> {
  getById({ id }: IGetById): Promise<ICustomerResponse> {
    const query = this.createQueryBuilder('customer')
      .innerJoin('customer.location', 'location')
      .innerJoin('location.state', 'state')
      .where('customer.id = :id', { id })
      .select(['customer.id', 'customer.firstName', 'customer.lastName', 'customer.role', 'customer.photoLink',
        'customer.email', 'customer.phone', 'location.id', 'location.city', 'state.name']);

    return query.getOne();
  }

  getAll({ locationId }: IGetAllCustomersParam): Promise<ICustomerResponse[]> {
    const query = this.createQueryBuilder('customer')
      .innerJoin('customer.location', 'location')
      .innerJoin('location.state', 'state');

    if (locationId) {
      query.where('customer.location = :locationId', { locationId });
    }

    query.select(['customer.id', 'customer.firstName', 'customer.lastName', 'customer.role', 'customer.photoLink',
      'customer.email', 'customer.phone', 'location.id', 'location.city', 'state.name']);

    return query.getMany();
  }

  getByPhoneOrEmail({ login }: ILogin): Promise<ICustomer> {
    const query = this.createQueryBuilder('customer')
      .where('customer.phone = :login', { login })
      .orWhere('customer.email = :login', { login })
      .select();

    return query.getOne();
  }

  updateToken({ id, token }: IUpdateToken): void {
    this.createQueryBuilder().update(Customer)
      .set({ token })
      .where('id = :id', { id })
      .execute()
      .then();
  }
}
