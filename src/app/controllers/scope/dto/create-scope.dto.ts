import { IsString, Length } from 'class-validator';

export class CreateScopeDto {
  @IsString()
  @Length(1, 70)
    name: string;
}
