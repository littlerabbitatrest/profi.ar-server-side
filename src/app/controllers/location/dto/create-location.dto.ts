import { IsString, Length } from 'class-validator';

import { IState } from '@app/interfaces';

export class CreateLocationDto {
  @IsString()
  @Length(1, 100)
    city: string;

  state: IState;
}
