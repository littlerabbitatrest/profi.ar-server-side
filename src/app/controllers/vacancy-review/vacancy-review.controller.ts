import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Post, Put, Query, UseGuards } from '@nestjs/common';

import { VacancyReviewService } from '@app/services/vacancy-review';
import {
  CreateVacancyReviewDto,
  IDeleteVacancyReviewResponse,
  IGetVacancyReviewsResponse,
  IGetVacancyReviewResponse,
  UpdateVacancyReviewDto
} from '@app/controllers/vacancy-review';
import { JWTGuard, RoleGuard } from '@app/guards';
import { Roles } from '@app/decorators';

@Controller('vacancyReviews')
@UseGuards(JWTGuard)
export class VacancyReviewController {
  constructor(private readonly vacancyReviewService: VacancyReviewService) {}

  @Get()
  async getAllVacancyReviews(
    @Query('vacancyId') vacancyId?: string,
  ): Promise<IGetVacancyReviewsResponse> {
    const vacancyReviews = await this.vacancyReviewService.getAllVacancyReviews({ vacancyId });

    return vacancyReviews;
  }

  @Get(':id')
  async getVacancyReview(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string
  ): Promise<IGetVacancyReviewResponse> {
    const vacancyReview = await this.vacancyReviewService.getVacancyReview({ id });

    return vacancyReview;
  }

  @Post()
  @UseGuards(RoleGuard)
  @Roles('common')
  async createVacancyReview(
    @Body() createVacancyReviewDto: CreateVacancyReviewDto
  ): Promise<IGetVacancyReviewResponse> {
    const vacancyReview = await this.vacancyReviewService.createVacancyReview(createVacancyReviewDto);

    return vacancyReview;
  }

  @Put(':id')
  @UseGuards(RoleGuard)
  @Roles('common')
  async updateVacancyReview(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body() updateVacancyReviewDto: UpdateVacancyReviewDto
  ): Promise<IGetVacancyReviewResponse> {
    const vacancyReview = await this.vacancyReviewService.updateVacancyReview({ id }, updateVacancyReviewDto);

    return vacancyReview;
  }

  @Delete(':id')
  @UseGuards(RoleGuard)
  @Roles('common', 'admin')
  async deleteVacancyReview(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string
  ): Promise<IDeleteVacancyReviewResponse> {
    const vacancyReview = await this.vacancyReviewService.deleteVacancyReview({ id });

    return vacancyReview;
  }
}
