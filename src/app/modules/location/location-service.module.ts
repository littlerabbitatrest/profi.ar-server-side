import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { LocationRepository } from '@app/repositories/location';
import { LocationService } from '@app/services/location';
import { StateServiceModule } from '@app/modules/state';

@Module({
  imports: [TypeOrmModule.forFeature([LocationRepository]), StateServiceModule],
  providers: [LocationService],
  exports: [TypeOrmModule.forFeature([LocationRepository]), LocationService]
})
export class LocationServiceModule {}
