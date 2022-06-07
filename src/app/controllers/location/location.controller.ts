import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Post, Put, Query, UseGuards } from '@nestjs/common';

import { LocationService } from '@app/services/location';
import {
  CreateLocationDto,
  IDeleteLocationResponse,
  IGetLocationsResponse,
  IGetLocationResponse,
  UpdateLocationDto
} from '@app/controllers/location';
import { JWTGuard, RoleGuard } from '@app/guards';
import { Roles } from '@app/decorators';

@Controller('locations')
@UseGuards(JWTGuard)
export class LocationController {
  constructor(private readonly locationService: LocationService) {}

  @Get()
  async getAllLocations(
    @Query('stateId') stateId?: string
  ): Promise<IGetLocationsResponse> {
    const locations = await this.locationService.getAllLocations({ stateId });

    return locations;
  }

  @Get(':id')
  async getLocation(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string
  ): Promise<IGetLocationResponse> {
    const location = await this.locationService.getLocation({ id });

    return location;
  }

  @Post()
  @UseGuards(RoleGuard)
  @Roles('admin')
  async createLocation(
    @Body() createLocationDto: CreateLocationDto
  ): Promise<IGetLocationResponse> {
    const location = await this.locationService.createLocation(createLocationDto);

    return location;
  }

  @Put(':id')
  @UseGuards(RoleGuard)
  @Roles('admin')
  async updateLocation(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body() updateLocationDto: UpdateLocationDto
  ): Promise<IGetLocationResponse> {
    const location = await this.locationService.updateLocation({ id }, updateLocationDto);

    return location;
  }

  @Delete(':id')
  @UseGuards(RoleGuard)
  @Roles('admin')
  async deleteLocation(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string
  ): Promise<IDeleteLocationResponse> {
    const location = await this.locationService.deleteLocation({ id });

    return location;
  }
}
