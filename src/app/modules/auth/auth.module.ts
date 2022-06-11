import { Module } from '@nestjs/common';

import { AuthController } from '@app/controllers/auth';
import { AuthService } from '@app/services/auth';
import { CustomerServiceModule } from '@app/modules/customer';
import { SpecialistServiceModule } from '@app/modules/specialist';
import { LocationServiceModule } from '@app/modules/location';

@Module({
  imports: [CustomerServiceModule, SpecialistServiceModule, LocationServiceModule],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService]
})
export class AuthModule {}
