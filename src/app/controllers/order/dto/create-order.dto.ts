import { IsNumber, IsString, IsUUID, Length, Max, Min } from 'class-validator';

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

  /* Ключи*/
  @IsUUID()
    customerId: string;

  @IsUUID()
    scopeId: string;

  @IsUUID()
    categoryId: string;
}
