import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Post, Put } from '@nestjs/common';
import { CreateResponse } from '@nonameteam/core';

import { SpecialistService } from '@app/services/specialist';
import {
  CreateSpecialistDto,
  IDeleteSpecialistResponse,
  IGetSpecialistsResponse,
  IGetSpecialistResponse,
  UpdateSpecialistDto,
  AuthorizationSpecialistDto
} from '@app/controllers/specialist';

@Controller('specialists')
export class SpecialistController {
  constructor(private readonly specialistService: SpecialistService) {}

  @Get()
  async getAllSpecialists(): Promise<IGetSpecialistsResponse> {
    const specialists = await this.specialistService.getAllSpecialists();

    if (specialists) {
      return CreateResponse(specialists, true);
    }

    return CreateResponse(null, false, 'Специалисты не были найдены');
  }

  @Get(':id')
  async getSpecialist(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string
  ): Promise<IGetSpecialistResponse> {
    const specialist = await this.specialistService.getSpecialist({ id });

    if (specialist) {
      return CreateResponse(specialist, true);
    }

    return CreateResponse(null, false, 'Специалист не был найден');
  }

  @Get('authorization')
  async authorizationSpecialist(
    @Body() authorizationSpecialistDto: AuthorizationSpecialistDto
  ): Promise<IGetSpecialistResponse> {
    const specialist = await this.specialistService.authorizationSpecialist({ ...authorizationSpecialistDto });

    if (specialist) {
      return CreateResponse(specialist, true);
    }

    return CreateResponse(null, false, 'Специалист не был найден');
  }

  @Post()
  async createSpecialist(
    @Body() createSpecialistDto: CreateSpecialistDto
  ): Promise<IGetSpecialistResponse> {
    const specialist = await this.specialistService.createSpecialist(createSpecialistDto);

    if (specialist) {
      return CreateResponse(specialist, true);
    }

    return CreateResponse(null, false, 'Специалист не был создан');
  }

  @Put(':id')
  async updateSpecialist(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body() updateSpecialistDto: UpdateSpecialistDto
  ): Promise<IGetSpecialistResponse> {
    const specialist = await this.specialistService.updateSpecialist({ id }, updateSpecialistDto);

    if (specialist) {
      return CreateResponse(specialist, true);
    }

    return CreateResponse(null, false, 'Специалист не был обновлен');
  }

  @Delete(':id')
  async removeSpecialist(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string
  ): Promise<IDeleteSpecialistResponse> {
    const specialist = await this.specialistService.deleteSpecialist({ id });

    if (specialist) {
      return CreateResponse(specialist, true);
    }

    return CreateResponse(null, false, 'Специалист не был удален');
  }
}
