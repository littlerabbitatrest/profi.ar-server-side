import { IsInt, IsOptional, IsString, Length, Max, Min } from 'class-validator';

export class UpdateVacancyReviewDto {
  @IsInt()
  @Min(1)
  @Max(5)
    rate: number;

  @IsOptional()
  @IsString()
  @Length(1, 1000)
    description: string;
}
