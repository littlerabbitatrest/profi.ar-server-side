import { Controller, Get, Post, Body, Param, Delete, ParseUUIDPipe, Put, UseGuards, Query } from '@nestjs/common';

import {
  CreateCategoryDto,
  UpdateCategoryDto,
  IDeleteCategoryResponse,
  IGetCategoriesResponse,
  IGetCategoryResponse
} from '@app/controllers/category';
import { CategoryService } from '@app/services/category';
import { JWTGuard, RoleGuard } from '@app/guards';
import { Roles } from '@app/decorators';

@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  async getAllCategories(
    @Query('scopeId') scopeId?: string
  ): Promise<IGetCategoriesResponse> {
    const categories = await this.categoryService.getAllCategories({ scopeId });

    return categories;
  }

  @Get(':id')
  async getCategory(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string
  ): Promise<IGetCategoryResponse> {
    const category = await this.categoryService.getCategory({ id });

    return category;
  }

  @Post()
  @UseGuards(RoleGuard, JWTGuard)
  @Roles('admin')
  async createCategory(
    @Body() createCategoryDto: CreateCategoryDto
  ): Promise<IGetCategoryResponse> {
    const category = await this.categoryService.createCategory(createCategoryDto);

    return category;
  }

  @Put(':id')
  @UseGuards(RoleGuard, JWTGuard)
  @Roles('admin')
  async updateCategory(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body() updateCategoryDto: UpdateCategoryDto
  ): Promise<IGetCategoryResponse> {
    const category = await this.categoryService.updateCategory({ id }, updateCategoryDto);

    return category;
  }

  @Delete(':id')
  @UseGuards(RoleGuard, JWTGuard)
  @Roles('admin')
  async deleteCategory(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string
  ): Promise<IDeleteCategoryResponse> {
    const category = await this.categoryService.deleteCategory({ id });

    return category;
  }
}
