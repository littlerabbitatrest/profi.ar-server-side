import { Injectable } from '@nestjs/common';
import { Transaction, TransactionRepository } from 'typeorm';

import { ICreateState, IGetStateById, IUpdateState } from '@app/services/state';
import { StateRepository } from '@app/repositories/state';
import { IState } from '@app/interfaces';

@Injectable()
export class StateService {
  @Transaction()
  createState(
    state: ICreateState,
    @TransactionRepository() stateRep?: StateRepository
  ): Promise<IState> {
    return stateRep.save(state);
  }

  @Transaction()
  getAllStates(
    @TransactionRepository() stateRep?: StateRepository
  ): Promise<IState[]> {
    return stateRep.getAll();
  }

  @Transaction()
  getState(
    { id }: IGetStateById,
    @TransactionRepository() stateRep?: StateRepository
  ): Promise<IState> {
    return stateRep.getById({ id });
  }

  @Transaction()
  updateState(
    { id }: IGetStateById,
    state: IUpdateState,
    @TransactionRepository() stateRep?: StateRepository
  ): Promise<IState> {
    return stateRep.save({ id, ...state });
  }

  @Transaction()
  deleteState(
    { id }: IGetStateById,
    @TransactionRepository() stateRep?: StateRepository
  ): Promise<IState> {
    return stateRep.softRemove({ id });
  }
}
