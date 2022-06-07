import { IsString, Length } from 'class-validator';

export class UpdateStateDto {
  @IsString()
  @Length(1, 100)
    name: string;
}
