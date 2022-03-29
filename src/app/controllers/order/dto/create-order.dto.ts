import { IsNumber, IsString, Length, Max, Min } from 'class-validator';

import { ICustomer, IScope } from '@app/interfaces';

export class CreateOrderDto {
  @IsString()
  @Length(1, 100)
    title: string;

  @IsString()
  @Length(1, 1000)
    description: string;

  @IsNumber()
  @Min(0)
  @Max(1000)
    price: number;

  customer: ICustomer;
  scope: IScope;
}
