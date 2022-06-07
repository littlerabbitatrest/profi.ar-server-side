import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Post, Put, Query, UseGuards } from '@nestjs/common';

import { OrderService } from '@app/services/order';
import {
  CreateOrderDto,
  IDeleteOrderResponse,
  IGetOrdersResponse,
  IGetOrderResponse,
  UpdateOrderDto
} from '@app/controllers/order';
import { JWTGuard, RoleGuard } from '@app/guards';
import { Roles } from '@app/decorators';

@Controller('orders')
@UseGuards(JWTGuard)
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Get()
  async getAllOrders(
    @Query('customerId') customerId?: string,
    @Query('vacancyId') vacancyId?: string,
    @Query('scopeId') scopeId?: string,
    @Query('categoryId') categoryId?: string,
  ): Promise<IGetOrdersResponse> {
    const orders = await this.orderService.getAllOrders({ customerId, scopeId, categoryId, vacancyId });

    return orders;
  }

  @Get(':id')
  async getOrder(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string
  ): Promise<IGetOrderResponse> {
    const order = await this.orderService.getOrder({ id });

    return order;
  }

  @Post()
  @UseGuards(RoleGuard)
  @Roles('common')
  async createOrder(
    @Body() createOrderDto: CreateOrderDto
  ): Promise<IGetOrderResponse> {
    const order = await this.orderService.createOrder(createOrderDto);

    return order;
  }

  @Put(':id')
  async updateOrder(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body() updateOrderDto: UpdateOrderDto
  ): Promise<IGetOrderResponse> {
    const order = await this.orderService.updateOrder({ id }, updateOrderDto);

    return order;
  }

  @Delete(':id')
  @UseGuards(RoleGuard)
  @Roles('common', 'admin')
  async deleteOrder(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string
  ): Promise<IDeleteOrderResponse> {
    const order = await this.orderService.deleteOrder({ id });

    return order;
  }
}
