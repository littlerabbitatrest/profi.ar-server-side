import { EntityRepository, Repository } from 'typeorm';

import { Category } from '@app/entities';
import { IGetByIdParam, ICategoryResponse, IGetAllCategoriesParam } from '@app/repositories/category';

@EntityRepository(Category)
export class CategoryRepository extends Repository<Category> {
  getById({ id }: IGetByIdParam): Promise<ICategoryResponse> {
    const query = this.createQueryBuilder('category')
      .innerJoin('category.scope', 'scope')
      .where('category.id = :id', { id })
      .select(['category.id', 'category.title', 'scope.id', 'category.name']);

    return query.getOne();
  }


  getAll({ scopeId }: IGetAllCategoriesParam): Promise<ICategoryResponse[]> {
    const query = this.createQueryBuilder('category')
      .innerJoin('category.scope', 'scope');

    if (scopeId) {
      query.where('category.scope = :acopeId', { scopeId });
    }

    query.select(['category.id', 'category.title', 'scope.id', 'category.name']);

    return query.getMany();
  }
}
