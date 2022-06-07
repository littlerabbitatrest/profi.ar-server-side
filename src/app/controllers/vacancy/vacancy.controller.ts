import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Post, Put, Query, UseGuards } from '@nestjs/common';

import { VacancyService } from '@app/services/vacancy';
import {
  CreateVacancyDto,
  IDeleteVacancyResponse,
  IGetVacanciesResponse,
  IGetVacancyResponse,
  UpdateVacancyDto
} from '@app/controllers/vacancy';
import { JWTGuard, RoleGuard } from '@app/guards';
import { Roles } from '@app/decorators';

@Controller('vacancies')
@UseGuards(JWTGuard)
export class VacancyController {
  constructor(private readonly vacancyService: VacancyService) {}

  @Get()
  async getAllVacancies(
    @Query('specialistId') specialistId?: string,
    @Query('scopeId') scopeId?: string,
    @Query('categoryId') categoryId?: string,
  ): Promise<IGetVacanciesResponse> {
    const vacancies = await this.vacancyService.getAllVacancies({ specialistId, scopeId, categoryId });

    return vacancies;
  }

  @Get(':id')
  async getVacancy(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string
  ): Promise<IGetVacancyResponse> {
    const vacancy = await this.vacancyService.getVacancy({ id });

    return vacancy;
  }

  @Post()
  @UseGuards(RoleGuard)
  @Roles('specialist')
  async createVacancy(
    @Body() createVacancyDto: CreateVacancyDto
  ): Promise<IGetVacancyResponse> {
    const vacancy = await this.vacancyService.createVacancy(createVacancyDto);

    return vacancy;
  }

  @Put(':id')
  @UseGuards(RoleGuard)
  @Roles('specialist')
  async updateVacancy(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body() updateVacancyDto: UpdateVacancyDto
  ): Promise<IGetVacancyResponse> {
    const vacancy = await this.vacancyService.updateVacancy({ id }, updateVacancyDto);

    return vacancy;
  }

  @Delete(':id')
  @UseGuards(RoleGuard)
  @Roles('specialist')
  async deleteVacancy(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string
  ): Promise<IDeleteVacancyResponse> {
    const vacancy = await this.vacancyService.deleteVacancy({ id });

    return vacancy;
  }
}
