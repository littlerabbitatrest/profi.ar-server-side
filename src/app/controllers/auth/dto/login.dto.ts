import { IsString, Length } from 'class-validator';

export class LoginDto {
  // Телефон или email
  @IsString()
  @Length(1, 50)
    login: string;

  @IsString()
  @Length(6, 20)
    password: string;
}
