import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Post, Put } from '@nestjs/common';
import { CreateResponse } from '@nonameteam/core';

import { CustomerReviewService } from '@app/services/customer-review';
import {
  CreateCustomerReviewDto,
  IDeleteCustomerReviewResponse,
  IGetCustomerReviewsResponse,
  IGetCustomerReviewResponse,
  UpdateCustomerReviewDto
} from '@app/controllers/customer-review';

@Controller('customerReviews')
export class CustomerReviewController {
  constructor(private readonly customerReviewService: CustomerReviewService) {}

  @Get()
  async getAllCustomerReviews(): Promise<IGetCustomerReviewsResponse> {
    const customerReviews = await this.customerReviewService.getAllCustomerReviews();

    if (customerReviews) {
      return CreateResponse(customerReviews, true);
    }

    return CreateResponse(null, false, 'Отзывы заказчиков не были найдены');
  }

  @Get(':id')
  async getCustomerReview(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string
  ): Promise<IGetCustomerReviewResponse> {
    const customerReview = await this.customerReviewService.getCustomerReview({ id });

    if (customerReview) {
      return CreateResponse(customerReview, true);
    }

    return CreateResponse(null, false, 'Отзыв заказчика не был найден');
  }

  @Post()
  async createCustomerReview(
    @Body() createCustomerReviewDto: CreateCustomerReviewDto
  ): Promise<IGetCustomerReviewResponse> {
    const customerReview = await this.customerReviewService.createCustomerReview(createCustomerReviewDto);

    if (customerReview) {
      return CreateResponse(customerReview, true);
    }

    return CreateResponse(null, false, 'Отзыв заказчика не был создан');
  }

  @Put(':id')
  async updateCustomerReview(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body() updateCustomerReviewDto: UpdateCustomerReviewDto
  ): Promise<IGetCustomerReviewResponse> {
    const customerReview = await this.customerReviewService.updateCustomerReview({ id }, updateCustomerReviewDto);

    if (customerReview) {
      return CreateResponse(customerReview, true);
    }

    return CreateResponse(null, false, 'Отзыв заказчика не был обновлен');
  }

  @Delete(':id')
  async removeCustomerReview(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string
  ): Promise<IDeleteCustomerReviewResponse> {
    const customerReview = await this.customerReviewService.deleteCustomerReview({ id });

    if (customerReview) {
      return CreateResponse(customerReview, true);
    }

    return CreateResponse(null, false, 'Отзыв заказчика не был удален');
  }
}
