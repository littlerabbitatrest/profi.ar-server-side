import { IsEnum, IsNumber, IsString, IsUUID, Length, Max, Min } from 'class-validator';

import { Statuses } from '@app/interfaces';

export class UpdateOrderDto {
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

  @IsEnum(Statuses)
    status: Statuses;

  /* Ключи*/
  @IsUUID()
    vacancyId: string;
}
