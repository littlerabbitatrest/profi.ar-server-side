import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Post, Put } from '@nestjs/common';
import { CreateResponse } from '@nonameteam/core';

import { OrderService } from '@app/services/order';
import {
  CreateOrderDto,
  IDeleteOrderResponse,
  IGetOrdersResponse,
  IGetOrderResponse,
  UpdateOrderDto
} from '@app/controllers/order';

@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Get()
  async getAllOrders(): Promise<IGetOrdersResponse> {
    const orders = await this.orderService.getAllOrders();

    if (orders) {
      return CreateResponse(orders, true);
    }

    return CreateResponse(null, false, 'Заказы не были найдены');
  }

  @Get(':id')
  async getOrder(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string
  ): Promise<IGetOrderResponse> {
    const order = await this.orderService.getOrder({ id });

    if (order) {
      return CreateResponse(order, true);
    }

    return CreateResponse(null, false, 'Заказ не был найден');
  }

  @Post()
  async createOrder(
    @Body() createOrderDto: CreateOrderDto
  ): Promise<IGetOrderResponse> {
    const order = await this.orderService.createOrder(createOrderDto);

    if (order) {
      return CreateResponse(order, true);
    }

    return CreateResponse(null, false, 'Заказ не был создан');
  }

  @Put(':id')
  async updateOrder(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body() updateOrderDto: UpdateOrderDto
  ): Promise<IGetOrderResponse> {
    const order = await this.orderService.updateOrder({ id }, updateOrderDto);

    if (order) {
      return CreateResponse(order, true);
    }

    return CreateResponse(null, false, 'Заказ не был обновлен');
  }

  @Delete(':id')
  async removeOrder(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string
  ): Promise<IDeleteOrderResponse> {
    const order = await this.orderService.deleteOrder({ id });

    if (order) {
      return CreateResponse(order, true);
    }

    return CreateResponse(null, false, 'Заказ не был удален');
  }
}
