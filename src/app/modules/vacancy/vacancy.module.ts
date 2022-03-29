import { Module } from '@nestjs/common';

import { VacancyController } from '@app/controllers/vacancy';
import { VacancyServiceModule } from '@app/modules/vacancy';

@Module({
  imports: [VacancyServiceModule],
  controllers: [VacancyController],
  providers: []
})
export class VacancyModule {}
