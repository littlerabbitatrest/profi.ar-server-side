import { IsNumber, IsString } from 'class-validator';
import { sign } from 'jsonwebtoken';

export class AccessTokenDto {
  @IsString()
    id: string;

  @IsString()
    role: string;

  @IsNumber()
    iat?: number;

  @IsNumber()
    exp?: number;
}
export const generateJwtToken = (params: AccessTokenDto): string => {
  const { JWT_ACCESS_EXPIRES, JWT_ACCESS_SECRET } = process.env;

  return sign(params, JWT_ACCESS_SECRET, { expiresIn: parseInt(JWT_ACCESS_EXPIRES, 10) });
};
