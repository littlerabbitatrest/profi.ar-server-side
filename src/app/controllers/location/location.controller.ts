import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Post, Put } from '@nestjs/common';

import { LocationService } from '@app/services/location';
import {
  CreateLocationDto,
  IDeleteLocationResponse,
  IGetLocationsResponse,
  IGetLocationResponse,
  UpdateLocationDto
} from '@app/controllers/location';
import { CreateResponse } from '@nonameteam/core';

@Controller('locations')
export class LocationController {
  constructor(private readonly locationService: LocationService) {}

  @Get()
  async getAllLocations(): Promise<IGetLocationsResponse> {
    const locations = await this.locationService.getAllLocations();

    if (locations) {
      return CreateResponse(locations, true);
    }

    return CreateResponse(null, false, 'Локации не были найдены');
  }

  @Get(':id')
  async getLocation(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string
  ): Promise<IGetLocationResponse> {
    const location = await this.locationService.getLocation({ id });

    if (location) {
      return CreateResponse(location, true);
    }

    return CreateResponse(null, false, 'Локация не была найдена');
  }

  @Post()
  async createLocation(
    @Body() createLocationDto: CreateLocationDto
  ): Promise<IGetLocationResponse> {
    const location = await this.locationService.createLocation(createLocationDto);

    if (location) {
      return CreateResponse(location, true);
    }

    return CreateResponse(null, false, 'Локация не была создана');
  }

  @Put(':id')
  async updateLocation(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body() updateLocationDto: UpdateLocationDto
  ): Promise<IGetLocationResponse> {
    const location = await this.locationService.updateLocation({ id }, updateLocationDto);

    if (location) {
      return CreateResponse(location, true);
    }

    return CreateResponse(null, false, 'Локация не была обновлена');
  }

  @Delete(':id')
  async removeLocation(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string
  ): Promise<IDeleteLocationResponse> {
    const location = await this.locationService.deleteLocation({ id });

    if (location) {
      return CreateResponse(location, true);
    }

    return CreateResponse(null, false, 'Локация не была удалена');
  }
}
