import { Injectable } from '@nestjs/common';
import { Transaction, TransactionRepository } from 'typeorm';

import { IStateResponse, StateRepository } from '@app/repositories/state';
import { ICreateState, IGetStateById, IUpdateState } from '@app/services/state';

@Injectable()
export class StateService {
  @Transaction()
  createState(
    state: ICreateState,
    @TransactionRepository() stateRep?: StateRepository
  ): Promise<IStateResponse> {
    return stateRep.save(state);
  }

  @Transaction()
  getAllStates(
    @TransactionRepository() stateRep?: StateRepository
  ): Promise<IStateResponse[]> {
    return stateRep.getAll();
  }

  @Transaction()
  getState(
    { id }: IGetStateById,
    @TransactionRepository() stateRep?: StateRepository
  ): Promise<IStateResponse> {
    return stateRep.getById({ id });
  }

  @Transaction()
  updateState(
    { id }: IGetStateById,
    state: IUpdateState,
    @TransactionRepository() stateRep?: StateRepository
  ): Promise<IStateResponse> {
    return stateRep.save({ id, ...state });
  }

  @Transaction()
  deleteState(
    { id }: IGetStateById,
    @TransactionRepository() stateRep?: StateRepository
  ): Promise<IStateResponse> {
    return stateRep.softRemove({ id });
  }
}
