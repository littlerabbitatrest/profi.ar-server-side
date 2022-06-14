import { IsString } from 'class-validator';

export class GenerateUrlDto {
@IsString()
  fileName: string;
}
