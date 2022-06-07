import { IsInt, IsOptional, IsString, IsUUID, Length, Max, Min } from 'class-validator';

export class CreateVacancyReviewDto {
  @IsInt()
  @Min(1)
  @Max(5)
    rate: number;

  @IsOptional()
  @IsString()
  @Length(1, 1000)
    description: string;

  /* Ключи*/
 @IsUUID()
   vacancyId: string;

  @IsUUID()
    customerId: string;
}
