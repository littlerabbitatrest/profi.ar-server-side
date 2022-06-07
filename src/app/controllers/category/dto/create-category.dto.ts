import { IsString, IsUUID, Length } from 'class-validator';

export class CreateCategoryDto {
  @IsString()
  @Length(1, 100)
    title: string;

  @IsUUID()
    scopeId: string;
}
