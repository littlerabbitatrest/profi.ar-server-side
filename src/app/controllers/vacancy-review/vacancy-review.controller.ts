import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Post, Put } from '@nestjs/common';

import { VacancyReviewService } from '@app/services/vacancy-review';
import {
  CreateVacancyReviewDto,
  IDeleteVacancyReviewResponse,
  IGetVacanciesReviewsResponse,
  IGetVacancyReviewResponse,
  UpdateVacancyReviewDto
} from '@app/controllers/vacancy-review';
import { CreateResponse } from '@nonameteam/core';

@Controller('vacancyReviews')
export class VacancyReviewController {
  constructor(private readonly vacancyReviewService: VacancyReviewService) {}

  @Get()
  async getAllVacancyReviews(): Promise<IGetVacanciesReviewsResponse> {
    const vacancyReviews = await this.vacancyReviewService.getAllVacancyReviews();

    if (vacancyReviews) {
      return CreateResponse(vacancyReviews, true);
    }

    return CreateResponse(null, false, 'Отзывы специалистов не были найдены');
  }

  @Get(':id')
  async getVacancyReview(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string
  ): Promise<IGetVacancyReviewResponse> {
    const vacancyReview = await this.vacancyReviewService.getVacancyReview({ id });

    if (vacancyReview) {
      return CreateResponse(vacancyReview, true);
    }

    return CreateResponse(null, false, 'Отзыв специалиста не был найден');
  }

  @Post()
  async createVacancyReview(
    @Body() createVacancyReviewDto: CreateVacancyReviewDto
  ): Promise<IGetVacancyReviewResponse> {
    const vacancyReview = await this.vacancyReviewService.createVacancyReview(createVacancyReviewDto);

    if (vacancyReview) {
      return CreateResponse(vacancyReview, true);
    }

    return CreateResponse(null, false, 'Отзыв специалиста не был создан');
  }

  @Put(':id')
  async updateVacancyReview(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body() updateVacancyReviewDto: UpdateVacancyReviewDto
  ): Promise<IGetVacancyReviewResponse> {
    const vacancyReview = await this.vacancyReviewService.updateVacancyReview({ id }, updateVacancyReviewDto);

    if (vacancyReview) {
      return CreateResponse(vacancyReview, true);
    }

    return CreateResponse(null, false, 'Отзыв специалиста не был обновлен');
  }

  @Delete(':id')
  async removeVacancyReview(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string
  ): Promise<IDeleteVacancyReviewResponse> {
    const vacancyReview = await this.vacancyReviewService.deleteVacancyReview({ id });

    if (vacancyReview) {
      return CreateResponse(vacancyReview, true);
    }

    return CreateResponse(null, false, 'Отзыв специалиста не был удален');
  }
}
