import { IsString, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  // Телефон или email
  @ApiProperty()
  @IsString()
  @Length(1, 50)
    login: string;

  @ApiProperty()
  @IsString()
  @Length(6, 20)
    password: string;
}
