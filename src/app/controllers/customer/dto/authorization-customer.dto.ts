import { IsString, Length } from 'class-validator';

export class AuthorizationCustomerDto {
  @IsString()
    login: string;

  @IsString()
  @Length(8, 20)
    password: string;
}
