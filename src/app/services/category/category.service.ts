import { Injectable } from '@nestjs/common';
import { Transaction, TransactionRepository } from 'typeorm';

import { CategoryRepository } from '@app/repositories/category';
import { ICreateCategory, IGetCategoryById, IUpdateCategory } from '@app/services/category';
import { ICategory } from '@app/interfaces';

@Injectable()
export class CategoryService {
  @Transaction()
  createCategory(
    category: ICreateCategory,
    @TransactionRepository() categoryRep?: CategoryRepository
  ): Promise<ICategory> {
    return categoryRep.save(category);
  }

  @Transaction()
  getAllCategories(
    @TransactionRepository() categoryRep?: CategoryRepository
  ): Promise<ICategory[]> {
    return categoryRep.getAll();
  }

  @Transaction()
  getCategory(
    { id }: IGetCategoryById,
    @TransactionRepository() categoryRep?: CategoryRepository
  ): Promise<ICategory> {
    return categoryRep.getById({ id });
  }

  @Transaction()
  updateCategory(
    { id }: IGetCategoryById, category: IUpdateCategory,
    @TransactionRepository() categoryRep?: CategoryRepository
  ): Promise<ICategory> {
    return categoryRep.save({ id, ...category });
  }

  @Transaction()
  deleteCategory(
    { id }: IGetCategoryById,
    @TransactionRepository() categoryRep?: CategoryRepository
  ): Promise<ICategory> {
    return categoryRep.softRemove({ id });
  }
}
