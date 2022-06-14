import { IsEmail, IsMobilePhone, IsOptional, IsString, IsUrl, IsUUID, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RegistrationDto {
  @ApiProperty()
  @IsString()
  @Length(1, 50)
    firstName: string;

  @ApiProperty()
  @IsString()
  @Length(1, 50)
    lastName: string;

  @IsEmail()
    email: string;

  @IsMobilePhone()
    phone: string;

  @IsString()
  @Length(6, 20)
    password: string;

  @IsUrl()
  @IsOptional()
    photoLink: string;

  @IsUUID()
    locationId: string;
}
