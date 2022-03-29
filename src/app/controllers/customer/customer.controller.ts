import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Post, Put } from '@nestjs/common';
import { CreateResponse } from '@nonameteam/core';

import { CustomerService } from '@app/services/customer';
import {
  CreateCustomerDto,
  IDeleteCustomerResponse,
  IGetCustomersResponse,
  IGetCustomerResponse,
  UpdateCustomerDto,
  AuthorizationCustomerDto
} from '@app/controllers/customer';

@Controller('customers')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Get()
  async getAllCustomers(): Promise<IGetCustomersResponse> {
    const customers = await this.customerService.getAllCustomers();

    if (customers) {
      return CreateResponse(customers, true);
    }

    return CreateResponse(null, false, 'Заказчики не были найдены');
  }

  @Get(':id')
  async getCustomer(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string
  ): Promise<IGetCustomerResponse> {
    const customer = await this.customerService.getCustomer({ id });

    if (customer) {
      return CreateResponse(customer, true);
    }

    return CreateResponse(null, false, 'Заказчик не был найден');
  }

  @Get('authorization')
  async authorizationCustomer(
    @Body() authorizationCustomerDto: AuthorizationCustomerDto
  ): Promise<IGetCustomerResponse> {
    const customer = await this.customerService.authorizationCustomer({ ...authorizationCustomerDto });

    if (customer) {
      return CreateResponse(customer, true);
    }

    return CreateResponse(null, false, 'Заказчик не был найден');
  }

  @Post()
  async createCustomer(
    @Body() createCustomerDto: CreateCustomerDto
  ): Promise<IGetCustomerResponse> {
    const customer = await this.customerService.createCustomer(createCustomerDto);

    if (customer) {
      return CreateResponse(customer, true);
    }

    return CreateResponse(null, false, 'Заказчик не был создан');
  }

  @Put(':id')
  async updateCustomer(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body() updateCustomerDto: UpdateCustomerDto
  ): Promise<IGetCustomerResponse> {
    const customer = await this.customerService.updateCustomer({ id }, updateCustomerDto);

    if (customer) {
      return CreateResponse(customer, true);
    }

    return CreateResponse(null, false, 'Заказчик не был обновлен');
  }

  @Delete(':id')
  async removeCustomer(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string
  ): Promise<IDeleteCustomerResponse> {
    const customer = await this.customerService.deleteCustomer({ id });

    if (customer) {
      return CreateResponse(customer, true);
    }

    return CreateResponse(null, false, 'Заказчик не был удален');
  }
}
