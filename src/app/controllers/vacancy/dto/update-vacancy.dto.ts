import { IsString, Length } from 'class-validator';

export class UpdateVacancyDto {
  @IsString()
  @Length(1, 100)
    education: string;

  @IsString()
  @Length(1, 100)
    experience: string;
}
