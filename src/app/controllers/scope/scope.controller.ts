import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Post, Put } from '@nestjs/common';
import { CreateResponse } from '@nonameteam/core';

import { ScopeService } from '@app/services/scope';
import {
  CreateScopeDto,
  IDeleteScopeResponse,
  IGetScopesResponse,
  IGetScopeResponse,
  UpdateScopeDto
} from '@app/controllers/scope';

@Controller('scopes')
export class ScopeController {
  constructor(private readonly scopeService: ScopeService) {}

  @Get()
  async getAllScopes(): Promise<IGetScopesResponse> {
    const scopes = await this.scopeService.getAllScopes();

    if (scopes) {
      return CreateResponse(scopes, true);
    }

    return CreateResponse(null, false, 'Сферы деятельности не были найдены');
  }

  @Get(':id')
  async getScope(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string
  ): Promise<IGetScopeResponse> {
    const scope = await this.scopeService.getScope({ id });

    if (scope) {
      return CreateResponse(scope, true);
    }

    return CreateResponse(null, false, 'Сфера деятельности не была найдена');
  }

  @Post()
  async createScope(
    @Body() createScopeDto: CreateScopeDto
  ): Promise<IGetScopeResponse> {
    const scope = await this.scopeService.createScope(createScopeDto);

    if (scope) {
      return CreateResponse(scope, true);
    }

    return CreateResponse(null, false, 'Сфера деятельности не была создана');
  }

  @Put(':id')
  async updateScope(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body() updateScopeDto: UpdateScopeDto
  ): Promise<IGetScopeResponse> {
    const scope = await this.scopeService.updateScope({ id }, updateScopeDto);

    if (scope) {
      return CreateResponse(scope, true);
    }

    return CreateResponse(null, false, 'Сфера деятельности не была обновлена');
  }

  @Delete(':id')
  async removeScope(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string
  ): Promise<IDeleteScopeResponse> {
    const scope = await this.scopeService.deleteScope({ id });

    if (scope) {
      return CreateResponse(scope, true);
    }

    return CreateResponse(null, false, 'Сфера деятельности не была удалена');
  }
}
