import { IsString, Length } from 'class-validator';

export class UpdateScopeDto {
  @IsString()
  @Length(1, 70)
    name: string;
}
