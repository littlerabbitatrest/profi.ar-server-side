import { ILocation } from '@app/interfaces';
import { IsEmail, IsString, Length } from 'class-validator';

export class UpdateSpecialistDto {
  @IsString()
  @Length(2, 50)
    firstName: string;

  @IsString()
  @Length(2, 50)
    lastName: string;

  @IsString()
  @Length(1, 100)
    photoLink: string;

  @IsEmail()
    email: string;

  @IsString()
  @Length(12, 13)
    phone: string;

  @IsString()
  @Length(8, 20)
    password: string;

  /* Отношения*/
  location: ILocation;
}
