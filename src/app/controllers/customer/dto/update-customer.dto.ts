import { IsEmail, IsString, Length } from 'class-validator';


import { ILocation } from '@app/interfaces';

export class UpdateCustomerDto {
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
  @Length(2, 50)
    phone: string;

  @IsString()
  @Length(8, 20)
    password: string;

  /* Отношения*/
  location: ILocation;
}
