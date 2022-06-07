import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CategoryRepository } from '@app/repositories/category';
import { CategoryService } from '@app/services/category';
import { ScopeServiceModule } from '@app/modules/scope';

@Module({
  imports: [TypeOrmModule.forFeature([CategoryRepository]), ScopeServiceModule],
  providers: [CategoryService],
  exports: [TypeOrmModule.forFeature([CategoryRepository]), CategoryService]
})
export class CategoryServiceModule {}
