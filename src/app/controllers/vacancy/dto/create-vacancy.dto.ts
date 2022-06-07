import { IsString, IsUUID, Length } from 'class-validator';

export class CreateVacancyDto {
  @IsString()
  @Length(1, 100)
    education: string;

  @IsString()
  @Length(1, 100)
    experience: string;

  /* Ключи*/
  @IsUUID()
    scopeId: string;

  @IsUUID()
    categoryId: string;

  @IsUUID()
    specialistId: string;
}
