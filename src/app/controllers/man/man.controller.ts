import { Body, Controller, Get, Param, ParseUUIDPipe, Post } from '@nestjs/common';

import { ICreateManResponse, IGetAllMenResponse, IGetManResponse } from '@app/controllers/man/responses';
import { CreateManDto } from '@app/controllers/man/dto';
import { ManService } from '@app/services/man';

@Controller('men')
export class ManController {
  constructor(
    private readonly manService: ManService
  ) {}

  @Post()
  createChat(@Body() dto: CreateManDto): Promise<ICreateManResponse> {
    return this.manService.save({ dto });
  }

  @Get()
  getAllMen(): Promise<IGetAllMenResponse> {
    return this.manService.getAll();
  }

  @Get(':id')
  getMan(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string): Promise<IGetManResponse> {
    return this.manService.getOne({
      id,
      attach: { cats: true }
    });
  }
}
