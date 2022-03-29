import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Post, Put } from '@nestjs/common';
import { CreateResponse } from '@nonameteam/core';

import { VacancyService } from '@app/services/vacancy';
import {
  CreateVacancyDto,
  IDeleteVacancyResponse,
  IGetVacanciesResponse,
  IGetVacancyResponse,
  UpdateVacancyDto
} from '@app/controllers/vacancy';

@Controller('vacancies')
export class VacancyController {
  constructor(private readonly vacancyService: VacancyService) {}

  @Get()
  async getAllVacancies(): Promise<IGetVacanciesResponse> {
    const vacancies = await this.vacancyService.getAllVacancies();

    if (vacancies) {
      return CreateResponse(vacancies, true);
    }

    return CreateResponse(null, false, 'Вакансии не были найдены');
  }

  @Get(':id')
  async getVacancy(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string
  ): Promise<IGetVacancyResponse> {
    const vacancy = await this.vacancyService.getVacancy({ id });

    if (vacancy) {
      return CreateResponse(vacancy, true);
    }

    return CreateResponse(null, false, 'Вакансия не была найдена');
  }

  @Post()
  async createVacancy(
    @Body() createVacancyDto: CreateVacancyDto
  ): Promise<IGetVacancyResponse> {
    const vacancy = await this.vacancyService.createVacancy(createVacancyDto);

    if (vacancy) {
      return CreateResponse(vacancy, true);
    }

    return CreateResponse(null, false, 'Вакансия не была создана');
  }

  @Put(':id')
  async updateVacancy(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body() updateVacancyDto: UpdateVacancyDto
  ): Promise<IGetVacancyResponse> {
    const vacancy = await this.vacancyService.updateVacancy({ id }, updateVacancyDto);

    if (vacancy) {
      return CreateResponse(vacancy, true);
    }

    return CreateResponse(null, false, 'Вакансия не была обновлена');
  }

  @Delete(':id')
  async removeVacancy(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string
  ): Promise<IDeleteVacancyResponse> {
    const vacancy = await this.vacancyService.deleteVacancy({ id });

    if (vacancy) {
      return CreateResponse(vacancy, true);
    }

    return CreateResponse(null, false, 'Вакансия не была удалена');
  }
}
