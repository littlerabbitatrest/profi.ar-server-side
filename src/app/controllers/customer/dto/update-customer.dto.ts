import { IsEmail, IsEnum, IsOptional, IsString, IsUrl, IsUUID, Length } from 'class-validator';

import { Roles } from '@app/interfaces';

export class UpdateCustomerDto {
  @IsString()
  @Length(2, 50)
    firstName: string;

  @IsString()
  @Length(2, 50)
    lastName: string;

  @IsUrl()
  @IsOptional()
    photoLink: string;

  @IsEmail()
    email: string;

  @IsString()
  @Length(2, 50)
    phone: string;

  @IsEnum(Roles)
    role: Roles;

  /* Ключи*/
  @IsUUID()
    locationId: string;
}
