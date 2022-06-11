import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Post, Put, UseGuards } from '@nestjs/common';

import { StateService } from '@app/services/state';
import {
  CreateStateDto,
  IDeleteStateResponse,
  IGetStatesResponse,
  IGetStateResponse,
  UpdateStateDto
} from '@app/controllers/state';
import { JWTGuard, RoleGuard } from '@app/guards';
import { Roles } from '@app/decorators';

@Controller('states')
export class StateController {
  constructor(private readonly stateService: StateService) {}

  @Get()
  async getAllStates(): Promise<IGetStatesResponse> {
    const states = await this.stateService.getAllStates();

    return states;
  }

  @Get(':id')
  async getState(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string
  ): Promise<IGetStateResponse> {
    const state = await this.stateService.getState({ id });

    return state;
  }

  @Post()
  @UseGuards(RoleGuard, JWTGuard)
  @Roles('admin')
  async createState(
    @Body() createStateDto: CreateStateDto
  ): Promise<IGetStateResponse> {
    const state = await this.stateService.createState(createStateDto);

    return state;
  }

  @Put(':id')
  @UseGuards(RoleGuard, JWTGuard)
  @Roles('admin')
  async updateState(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body() updateStateDto: UpdateStateDto
  ): Promise<IGetStateResponse> {
    const state = await this.stateService.updateState({ id }, updateStateDto);

    return state;
  }

  @Delete(':id')
  @UseGuards(RoleGuard, JWTGuard)
  @Roles('admin')
  async deleteState(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string
  ): Promise<IDeleteStateResponse> {
    const state = await this.stateService.deleteState({ id });

    return state;
  }
}
