import { IsString, Length } from 'class-validator';

export class CreateStateDto {
  @IsString()
  @Length(1, 100)
    name: string;
}
