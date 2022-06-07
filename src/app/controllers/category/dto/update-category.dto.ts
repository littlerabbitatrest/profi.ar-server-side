import { IsString, IsUUID, Length } from 'class-validator';

export class UpdateCategoryDto {
  @IsString()
  @Length(1, 100)
    title: string;

  @IsUUID()
    scopeId: string;
}
