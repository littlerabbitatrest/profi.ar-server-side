import { IsArray, IsNumber, IsString, Length, ValidateNested } from 'class-validator';
import { Type } from "class-transformer";

export class CreateCatDto {
  @IsString()
  @Length(1, 100)
  name: string;
}

export class CreateManDto {
  @IsString()
  @Length(1, 100)
  name: string;

  @IsNumber()
  age: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateCatDto)
  cats: CreateCatDto[];
}
