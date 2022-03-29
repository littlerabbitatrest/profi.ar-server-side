import { EntityRepository, Repository } from 'typeorm';

import { Category } from '@app/entities';
import { IGetById } from '@app/repositories/category';
import { ICategory } from '@app/interfaces';

@EntityRepository(Category)
export class CategoryRepository extends Repository<Category> {
  getById({ id }: IGetById): Promise<ICategory> {
    const query = this.createQueryBuilder('category')
      .where('category.id = :id', { id })
      .select();

    return query.getOne();
  }

  getAll(): Promise<ICategory[]> {
    const query = this.createQueryBuilder('category').select();

    return query.getMany();
  }
}
