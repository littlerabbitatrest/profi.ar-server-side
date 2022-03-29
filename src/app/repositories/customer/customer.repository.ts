import { EntityRepository, Repository } from 'typeorm';

import { Customer } from '@app/entities';
import { ICustomer } from '@app/interfaces';
import { IAuthorization, IGetById } from '@app/repositories/customer';

@EntityRepository(Customer)
export class CustomerRepository extends Repository<Customer> {
  getById({ id }: IGetById): Promise<ICustomer> {
    const query = this.createQueryBuilder('customer')
      .where('customer.id = :id', { id })
      .select();

    return query.getOne();
  }

  getAll(): Promise<ICustomer[]> {
    const query = this.createQueryBuilder('customer').select();

    return query.getMany();
  }

  authorization({ login, password }: IAuthorization): Promise<ICustomer> {
    const query = this.createQueryBuilder('customer')
      .where('(customer.phone = :login or customer.email = :login) and customer.password = :password', { login, password })
      .select();

    return query.getOne();
  }
}
