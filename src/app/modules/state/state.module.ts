import { Module } from '@nestjs/common';

import { StateController } from '@app/controllers/state';
import { StateServiceModule } from '@app/modules/state';
import { JWTGuard, RoleGuard } from '@app/guards';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomerRepository } from '@app/repositories/customer';
import { SpecialistRepository } from '@app/repositories/specialist';

@Module({
  imports: [StateServiceModule, TypeOrmModule.forFeature([CustomerRepository, SpecialistRepository])],
  controllers: [StateController],
  providers: [JWTGuard, RoleGuard]
})
export class StateModule {}
