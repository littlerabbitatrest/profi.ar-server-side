import { Transaction, TransactionRepository } from 'typeorm';
import { Injectable } from '@nestjs/common';

import { ICreateParam, IGetOneParam } from '@app/services/man/params';
import { ManRepository } from '@app/repositories/man';
import { IMan } from '@app/interfaces';

@Injectable()
export class ManService {
  @Transaction()
  save(
    { dto }: ICreateParam,
    @TransactionRepository() chatRep?: ManRepository
  ): Promise<IMan> {
    return chatRep.save(dto);
  }

  @Transaction()
  async getOne(
    { id, attach = { cats: false } }: IGetOneParam,
    @TransactionRepository() chatRep?: ManRepository
  ): Promise<IMan> {
    const query = chatRep.createQueryBuilder('man')
      .where('man.id = :id', { id })
      .select(['man.id', 'man.name', 'man.age']);

    if (attach.cats) {
      query
        .leftJoin('man.cats', 'cats')
        .addSelect(['cats.id', 'cats.name']);
    }

    return query.getOne();
  }

  @Transaction()
  async getAll(
    @TransactionRepository() chatRep?: ManRepository
  ): Promise<IMan[]> {
    return chatRep.createQueryBuilder('men')
      .select(['men.id', 'men.name', 'men.age'])
      .getMany();
  }
}
