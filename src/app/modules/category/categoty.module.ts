import { Module } from '@nestjs/common';

import { CategoryController } from '@app/controllers/category';
import { CategoryServiceModule } from '@app/modules/category';
import { JWTGuard, RoleGuard } from '@app/guards';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomerRepository } from '@app/repositories/customer';
import { SpecialistRepository } from '@app/repositories/specialist';

@Module({
  imports: [CategoryServiceModule, TypeOrmModule.forFeature([CustomerRepository, SpecialistRepository])],
  controllers: [CategoryController],
  providers: [JWTGuard, RoleGuard]
})
export class CategoryModule {}
