import { IsString, Length } from 'class-validator';

import { IScope } from '@app/interfaces';

export class CreateCategoryDto {
  @IsString()
  @Length(1, 100)
    title: string;

  scope: IScope;
}
