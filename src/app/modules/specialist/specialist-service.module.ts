import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { SpecialistRepository } from '@app/repositories/specialist';
import { SpecialistService } from '@app/services/specialist';

@Module({
  imports: [TypeOrmModule.forFeature([SpecialistRepository])],
  providers: [SpecialistService],
  exports: [TypeOrmModule.forFeature([SpecialistRepository]), SpecialistService]
})
export class SpecialistServiceModule {}
