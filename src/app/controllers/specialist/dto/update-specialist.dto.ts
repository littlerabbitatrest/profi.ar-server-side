import { IsEmail, IsString, IsUUID, Length } from 'class-validator';

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

  /* Ключи*/
  @IsUUID()
    locationId: string;
}
