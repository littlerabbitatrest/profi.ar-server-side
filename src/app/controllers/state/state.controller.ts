import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Post, Put } from '@nestjs/common';
import { CreateResponse } from '@nonameteam/core';

import { StateService } from '@app/services/state';
import {
  CreateStateDto,
  IDeleteStateResponse,
  IGetStatesResponse,
  IGetStateResponse,
  UpdateStateDto
} from '@app/controllers/state';

@Controller('states')
export class StateController {
  constructor(private readonly stateService: StateService) {}

  @Get()
  async getAllStates(): Promise<IGetStatesResponse> {
    const states = await this.stateService.getAllStates();

    if (states) {
      return CreateResponse(states, true);
    }

    return CreateResponse(null, false, 'Штаты не были найдены');
  }

  @Get(':id')
  async getState(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string
  ): Promise<IGetStateResponse> {
    const state = await this.stateService.getState({ id });

    if (state) {
      return CreateResponse(state, true);
    }

    return CreateResponse(null, false, 'Штат не был найден');
  }

  @Post()
  async createState(
    @Body() createStateDto: CreateStateDto
  ): Promise<IGetStateResponse> {
    const state = await this.stateService.createState(createStateDto);

    if (state) {
      return CreateResponse(state, true);
    }

    return CreateResponse(null, false, 'Штат не был создан');
  }

  @Put(':id')
  async updateState(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body() updateStateDto: UpdateStateDto
  ): Promise<IGetStateResponse> {
    const state = await this.stateService.updateState({ id }, updateStateDto);

    if (state) {
      return CreateResponse(state, true);
    }

    return CreateResponse(null, false, 'Штат не был обновлен');
  }

  @Delete(':id')
  async removeState(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string
  ): Promise<IDeleteStateResponse> {
    const state = await this.stateService.deleteState({ id });

    if (state) {
      return CreateResponse(state, true);
    }

    return CreateResponse(null, false, 'Штат не был удален');
  }
}
