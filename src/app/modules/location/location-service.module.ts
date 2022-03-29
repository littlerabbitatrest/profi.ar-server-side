import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { LocationRepository } from '@app/repositories/location';
import { LocationService } from '@app/services/location';

@Module({
  imports: [TypeOrmModule.forFeature([LocationRepository])],
  providers: [LocationService],
  exports: [TypeOrmModule.forFeature([LocationRepository]), LocationService]
})
export class LocationServiceModule {}
