import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Post, Put, Query, UseGuards } from '@nestjs/common';

import { CustomerReviewService } from '@app/services/customer-review';
import {
  CreateCustomerReviewDto,
  IDeleteCustomerReviewResponse,
  IGetCustomerReviewsResponse,
  IGetCustomerReviewResponse,
  UpdateCustomerReviewDto
} from '@app/controllers/customer-review';
import { JWTGuard, RoleGuard } from '@app/guards';
import { Roles } from '@app/decorators';

@Controller('customerReviews')
@UseGuards(JWTGuard)
export class CustomerReviewController {
  constructor(private readonly customerReviewService: CustomerReviewService) {}

  @Get()
  @UseGuards(RoleGuard)
  @Roles('admin')
  async getAllCustomerReviews(
    @Query('customerId') customerId?: string,
  ): Promise<IGetCustomerReviewsResponse> {
    const customerReviews = await this.customerReviewService.getAllCustomerReviews({ customerId });

    return customerReviews;
  }

  @Get(':id')
  async getCustomerReview(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string
  ): Promise<IGetCustomerReviewResponse> {
    const customerReview = await this.customerReviewService.getCustomerReview({ id });

    return customerReview;
  }

  @Post()
  @UseGuards(RoleGuard)
  @Roles('specialist')
  async createCustomerReview(
    @Body() createCustomerReviewDto: CreateCustomerReviewDto
  ): Promise<IGetCustomerReviewResponse> {
    const customerReview = await this.customerReviewService.createCustomerReview(createCustomerReviewDto);

    return customerReview;
  }

  @Put(':id')
  @UseGuards(RoleGuard)
  @Roles('specialist')
  async updateCustomerReview(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body() updateCustomerReviewDto: UpdateCustomerReviewDto
  ): Promise<IGetCustomerReviewResponse> {
    const customerReview = await this.customerReviewService.updateCustomerReview({ id }, updateCustomerReviewDto);

    return customerReview;
  }

  @Delete(':id')
  @UseGuards(RoleGuard)
  @Roles('specialist', 'admin')
  async deleteCustomerReview(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string
  ): Promise<IDeleteCustomerReviewResponse> {
    const customerReview = await this.customerReviewService.deleteCustomerReview({ id });

    return customerReview;
  }
}
