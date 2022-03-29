import { IsString, Length } from 'class-validator';

export class AuthorizationSpecialistDto {
  @IsString()
    login: string;

  @IsString()
  @Length(8, 20)
    password: string;
}
