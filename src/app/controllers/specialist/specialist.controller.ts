import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Put, Query, UseGuards } from '@nestjs/common';

import { SpecialistService } from '@app/services/specialist';
import {
  IDeleteSpecialistResponse,
  IGetSpecialistsResponse,
  IGetSpecialistResponse,
  UpdateSpecialistDto
} from '@app/controllers/specialist';
import { JWTGuard, RoleGuard } from '@app/guards';
import { Roles } from '@app/decorators';

@Controller('specialists')
@UseGuards(JWTGuard)
export class SpecialistController {
  constructor(private readonly specialistService: SpecialistService) {}

  @Get()
  async getAllSpecialists(
    @Query('locationId') locationId?: string,
  ): Promise<IGetSpecialistsResponse> {
    const specialists = await this.specialistService.getAllSpecialists({ locationId });

    return specialists;
  }

  @Get(':id')
  async getSpecialist(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string
  ): Promise<IGetSpecialistResponse> {
    const specialist = await this.specialistService.getSpecialist({ id });

    return specialist;
  }

  @Put(':id')
  @UseGuards(RoleGuard)
  @Roles('specialist')
  async updateSpecialist(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body() updateSpecialistDto: UpdateSpecialistDto
  ): Promise<IGetSpecialistResponse> {
    const specialist = await this.specialistService.updateSpecialist({ id }, updateSpecialistDto);

    return specialist;
  }

  @Delete(':id')
  @UseGuards(RoleGuard)
  @Roles('specialist')
  async deleteSpecialist(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string
  ): Promise<IDeleteSpecialistResponse> {
    const specialist = await this.specialistService.deleteSpecialist({ id });

    return specialist;
  }
}
