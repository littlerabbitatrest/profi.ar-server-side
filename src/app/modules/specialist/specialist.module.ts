import { Module } from '@nestjs/common';

import { SpecialistController } from '@app/controllers/specialist';
import { SpecialistServiceModule } from '@app/modules/specialist';

@Module({
  imports: [SpecialistServiceModule],
  controllers: [SpecialistController],
  providers: []
})
export class SpecialistModule {}
