import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { verify, TokenExpiredError, JsonWebTokenError } from 'jsonwebtoken';
import { InjectRepository } from '@nestjs/typeorm';

import { isPortalWebToken } from '@src/utils';
import { CustomerRepository } from '@app/repositories/customer';
import { SpecialistRepository } from '@app/repositories/specialist';

export interface IDecodeToken {
  id: string,
  role: string,
}

@Injectable()
export class JWTGuard implements CanActivate {
  constructor(
    @InjectRepository(CustomerRepository) private readonly customerRep: CustomerRepository,
    @InjectRepository(SpecialistRepository) private readonly specialistRep: SpecialistRepository,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const jwt = this.pickJWT(request.headers.authorization);

    let user = null;

    if (checkStructure(jwt)) {
      if (jwt.role === 'specialist') {
        user = await this.specialistRep.getById({ id: jwt.id });
      }

      if (jwt.role === 'common' || jwt.role === 'admin') {
        user = await this.customerRep.getById({ id: jwt.id });
      }
    }
    return Boolean(user);
  }

  pickJWT(authorization: string) {
    try {
      const [_method, token] = authorization.split(' ');
      return verify(token, process.env.JWT_ACCESS_SECRET);
    } catch (error: unknown) {
      switch (true) {
      case error instanceof TokenExpiredError: throw new HttpException(
        'Время жизни токена авторизации истекло',
        HttpStatus.UNAUTHORIZED
      );
      case error instanceof JsonWebTokenError: throw new HttpException(
        'Некорректное содержание заголовка авторизации',
        HttpStatus.UNAUTHORIZED
      );
      case error instanceof TypeError: throw new HttpException(
        'Пустой заголовок авторизации',
        HttpStatus.UNAUTHORIZED
      );
      default: throw new HttpException(
        'Неизвестная ошибка авторизации',
        HttpStatus.UNAUTHORIZED
      );
      }
    }
  }
}

export const checkStructure = (JWT: unknown): JWT is IDecodeToken => {
  if (isPortalWebToken(JWT)) {
    return true;
  }

  throw new HttpException('Некорректная структура токена авторизации', HttpStatus.UNAUTHORIZED);
};
