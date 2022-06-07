import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Put, Query, UseGuards } from '@nestjs/common';

import { CustomerService } from '@app/services/customer';
import {
  IDeleteCustomerResponse,
  IGetCustomersResponse,
  IGetCustomerResponse,
  UpdateCustomerDto
} from '@app/controllers/customer';
import { JWTGuard, RoleGuard } from '@app/guards';
import { Roles } from '@app/decorators';

@Controller('customers')
@UseGuards(JWTGuard)
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Get()
  async getAllCustomers(
    @Query('locationId') locationId?: string
  ): Promise<IGetCustomersResponse> {
    const customers = await this.customerService.getAllCustomers({ locationId });

    return customers;
  }

  @Get(':id')
  async getCustomer(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string
  ): Promise<IGetCustomerResponse> {
    const customer = await this.customerService.getCustomer({ id });

    return customer;
  }

  @Put(':id')
  @UseGuards(RoleGuard)
  @Roles('common')
  async updateCustomer(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body() updateCustomerDto: UpdateCustomerDto
  ): Promise<IGetCustomerResponse> {
    const customer = await this.customerService.updateCustomer({ id }, updateCustomerDto);

    return customer;
  }

  @Delete(':id')
  @UseGuards(RoleGuard)
  @Roles('common')
  async deleteCustomer(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string
  ): Promise<IDeleteCustomerResponse> {
    const customer = await this.customerService.deleteCustomer({ id });

    return customer;
  }
}
