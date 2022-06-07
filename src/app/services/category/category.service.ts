import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Transaction, TransactionRepository } from 'typeorm';

import { CategoryRepository, IGetAllCategoriesParam, ICategoryResponse } from '@app/repositories/category';
import { ScopeRepository } from '@app/repositories/scope';
import { ICreateCategory, IGetCategoryById, IUpdateCategory } from '@app/services/category';
import { ScopeService } from '@app/services/scope';

@Injectable()
export class CategoryService {
  constructor(private readonly scopeService: ScopeService) {}

  @Transaction()
  createCategory(
    category: ICreateCategory,
    @TransactionRepository() categoryRep?: CategoryRepository,
    @TransactionRepository() scopeRep?: ScopeRepository,
  ): Promise<ICategoryResponse> {
    const scope = this.scopeService.getScope({ id: category.scopeId }, scopeRep);

    if (!scope) {
      throw new HttpException('Сфера деятельности не найдена', HttpStatus.BAD_REQUEST);
    }

    return categoryRep.save(category);
  }

  @Transaction()
  getAllCategories(
    { scopeId }: IGetAllCategoriesParam,
    @TransactionRepository() categoryRep?: CategoryRepository
  ): Promise<ICategoryResponse[]> {
    return categoryRep.getAll({ scopeId });
  }

  @Transaction()
  getCategory(
    { id }: IGetCategoryById,
    @TransactionRepository() categoryRep?: CategoryRepository
  ): Promise<ICategoryResponse> {
    return categoryRep.getById({ id });
  }

  @Transaction()
  updateCategory(
    { id }: IGetCategoryById,
    category: IUpdateCategory,
    @TransactionRepository() categoryRep?: CategoryRepository,
    @TransactionRepository() scopeRep?: ScopeRepository,
  ): Promise<ICategoryResponse> {
    const scope = this.scopeService.getScope({ id: category.scopeId }, scopeRep);

    if (!scope) {
      throw new HttpException('Сфера деятельности не найдена', HttpStatus.BAD_REQUEST);
    }
    return categoryRep.save({ ...category, id });
  }

  @Transaction()
  deleteCategory(
    { id }: IGetCategoryById,
    @TransactionRepository() categoryRep?: CategoryRepository
  ): Promise<ICategoryResponse> {
    return categoryRep.softRemove({ id });
  }
}
