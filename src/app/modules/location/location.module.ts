import { Module } from '@nestjs/common';

import { LocationController } from '@app/controllers/location';
import { LocationServiceModule } from '@app/modules/location';

@Module({
  imports: [LocationServiceModule],
  controllers: [LocationController],
  providers: []
})
export class LocationModule {}
