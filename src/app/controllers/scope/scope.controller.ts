import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Post, Put, UseGuards } from '@nestjs/common';

import { ScopeService } from '@app/services/scope';
import {
  CreateScopeDto,
  IDeleteScopeResponse,
  IGetScopesResponse,
  IGetScopeResponse,
  UpdateScopeDto
} from '@app/controllers/scope';
import { JWTGuard, RoleGuard } from '@app/guards';
import { Roles } from '@app/decorators';

@Controller('scopes')
@UseGuards(JWTGuard)
export class ScopeController {
  constructor(private readonly scopeService: ScopeService) {}

  @Get()
  async getAllScopes(): Promise<IGetScopesResponse> {
    const scopes = await this.scopeService.getAllScopes();

    return scopes;
  }

  @Get(':id')
  async getScope(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string
  ): Promise<IGetScopeResponse> {
    const scope = await this.scopeService.getScope({ id });

    return scope;
  }

  @Post()
  @UseGuards(RoleGuard)
  @Roles('admin')
  async createScope(
    @Body() createScopeDto: CreateScopeDto
  ): Promise<IGetScopeResponse> {
    const scope = await this.scopeService.createScope(createScopeDto);

    return scope;
  }

  @Put(':id')
  @UseGuards(RoleGuard)
  @Roles('admin')
  async updateScope(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body() updateScopeDto: UpdateScopeDto
  ): Promise<IGetScopeResponse> {
    const scope = await this.scopeService.updateScope({ id }, updateScopeDto);

    return scope;
  }

  @Delete(':id')
  @UseGuards(RoleGuard)
  @Roles('admin')
  async deleteScope(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string
  ): Promise<IDeleteScopeResponse> {
    const scope = await this.scopeService.deleteScope({ id });

    return scope;
  }
}
