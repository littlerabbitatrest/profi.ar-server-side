import { Controller, Get, Post, Body, Param, Delete, ParseUUIDPipe, Put } from '@nestjs/common';
import { CreateResponse } from '@nonameteam/core';

import {
  CreateCategoryDto,
  UpdateCategoryDto,
  IDeleteCategoryResponse,
  IGetCategoriesResponse,
  IGetCategoryResponse
} from '@app/controllers/category';
import { CategoryService } from '@app/services/category';

@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  async getAllCategories(): Promise<IGetCategoriesResponse> {
    const categories = await this.categoryService.getAllCategories();

    if (categories) {
      return CreateResponse(categories, true);
    }

    return CreateResponse(null, false, 'Категории не были найдены');
  }

  @Get(':id')
  async getCategory(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string
  ): Promise<IGetCategoryResponse> {
    const category = await this.categoryService.getCategory({ id });

    if (category) {
      return CreateResponse(category, true);
    }

    return CreateResponse(null, false, 'Категория не была найдена');
  }

  @Post()
  async createCategory(
    @Body() createCategoryDto: CreateCategoryDto
  ): Promise<IGetCategoryResponse> {
    const category = await this.categoryService.createCategory(createCategoryDto);

    if (category) {
      return CreateResponse(category, true);
    }

    return CreateResponse(null, false, 'Категория не была создана');
  }

  @Put(':id')
  async updateCategory(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body() updateCategoryDto: UpdateCategoryDto
  ): Promise<IGetCategoryResponse> {
    const category = await this.categoryService.updateCategory({ id }, updateCategoryDto);

    if (category) {
      return CreateResponse(category, true);
    }

    return CreateResponse(null, false, 'Категория не была обновлена');
  }

  @Delete(':id')
  async removeCategory(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string
  ): Promise<IDeleteCategoryResponse> {
    const category = await this.categoryService.deleteCategory({ id });

    if (category) {
      return CreateResponse(category, true);
    }

    return CreateResponse(null, false, 'Категория не была удалена');
  }
}
