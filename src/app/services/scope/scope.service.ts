import { Injectable } from '@nestjs/common';
import { Transaction, TransactionRepository } from 'typeorm';

import { ICreateScope, IGetScopeById, IUpdateScope } from '@app/services/scope';
import { ScopeRepository } from '@app/repositories/scope';
import { IScope } from '@app/interfaces';

@Injectable()
export class ScopeService {
  @Transaction()
  createScope(
    scope: ICreateScope,
    @TransactionRepository() scopeRep?: ScopeRepository
  ): Promise<IScope> {
    return scopeRep.save(scope);
  }

  @Transaction()
  getAllScopes(
    @TransactionRepository() scopeRep?: ScopeRepository
  ): Promise<IScope[]> {
    return scopeRep.getAll();
  }

  @Transaction()
  getScope(
    { id }: IGetScopeById,
    @TransactionRepository() scopeRep?: ScopeRepository
  ): Promise<IScope> {
    return scopeRep.getById({ id });
  }

  @Transaction()
  updateScope(
    { id }: IGetScopeById,
    scope: IUpdateScope,
    @TransactionRepository() scopeRep?: ScopeRepository
  ): Promise<IScope> {
    return scopeRep.save({ id, ...scope });
  }

  @Transaction()
  deleteScope(
    { id }: IGetScopeById,
    @TransactionRepository() scopeRep?: ScopeRepository
  ): Promise<IScope> {
    return scopeRep.softRemove({ id });
  }
}
