import { Module } from '@nestjs/common';

import { AuthController } from '@app/controllers/auth';
import { AuthService } from '@app/services/auth';
import { CustomerServiceModule } from '@app/modules/customer';
import { SpecialistServiceModule } from '@app/modules/specialist';

@Module({
  imports: [CustomerServiceModule, SpecialistServiceModule],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService]
})
export class AuthModule {}
