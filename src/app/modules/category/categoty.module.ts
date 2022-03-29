import { Module } from '@nestjs/common';

import { CategoryController } from '@app/controllers/category';
import { CategoryServiceModule } from '@app/modules/category';

@Module({
  imports: [CategoryServiceModule],
  controllers: [CategoryController],
  providers: []
})
export class CategoryModule {}
