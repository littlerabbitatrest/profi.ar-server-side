import { Module } from '@nestjs/common';

import { CustomerController } from '@app/controllers/customer';
import { CustomerServiceModule } from '@app/modules/customer';

@Module({
  imports: [CustomerServiceModule],
  controllers: [CustomerController],
  providers: []
})
export class CustomerModule {}
