import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { SpecialistRepository } from '@app/repositories/specialist';
import { SpecialistService } from '@app/services/specialist';
import { LocationServiceModule } from '@app/modules/location';

@Module({
  imports: [TypeOrmModule.forFeature([SpecialistRepository]), LocationServiceModule],
  providers: [SpecialistService],
  exports: [TypeOrmModule.forFeature([SpecialistRepository]), SpecialistService]
})
export class SpecialistServiceModule {}
