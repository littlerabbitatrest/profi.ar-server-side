import { IsEnum, IsNumber, IsString, Length, Max, Min } from 'class-validator';

import { IVacancy, Statuses } from '@app/interfaces';

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

  vacancy: IVacancy;
}
