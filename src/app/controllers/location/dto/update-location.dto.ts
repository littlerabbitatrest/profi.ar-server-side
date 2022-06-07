import { IsString, IsUUID, Length } from 'class-validator';

export class UpdateLocationDto {
  @IsString()
  @Length(1, 100)
    city: string;

  /**/
  @IsUUID()
    stateId: string;
}
