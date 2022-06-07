import { IsString, IsUUID, Length } from 'class-validator';

export class CreateLocationDto {
  @IsString()
  @Length(1, 100)
    city: string;

  /* Ключи*/
  @IsUUID()
    stateId: string;
}
