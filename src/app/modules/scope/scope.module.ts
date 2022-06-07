import { Module } from '@nestjs/common';

import { ScopeController } from '@app/controllers/scope';
import { ScopeServiceModule } from '@app/modules/scope';
import { JWTGuard, RoleGuard } from '@app/guards';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomerRepository } from '@app/repositories/customer';
import { SpecialistRepository } from '@app/repositories/specialist';

@Module({
  imports: [ScopeServiceModule, TypeOrmModule.forFeature([CustomerRepository, SpecialistRepository])],
  controllers: [ScopeController],
  providers: [JWTGuard, RoleGuard]
})
export class ScopeModule {}
