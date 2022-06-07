import { IsEmail, IsMobilePhone, IsString, IsUUID, Length } from 'class-validator';
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

  @ApiProperty()
  @IsEmail()
    email: string;

  @ApiProperty()
  @IsMobilePhone()
    phone: string;

  @ApiProperty()
  @IsString()
  @Length(6, 20)
    password: string;

  @ApiProperty()
  @IsUUID()
    locationId: string;
}
