import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { verify } from 'jsonwebtoken';
import { InjectRepository } from '@nestjs/typeorm';

import { CustomerRepository } from '@app/repositories/customer';
import { SpecialistRepository } from '@app/repositories/specialist';
import { IDecodeToken } from '@app/guards';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    @InjectRepository(CustomerRepository) private readonly customerRep: CustomerRepository,
    @InjectRepository(SpecialistRepository) private readonly specialistRep: SpecialistRepository,

  ) { }

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());

    if (!roles) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const jwt = verify(request.headers.authorization, process.env.JWT_ACCESS_SECRET) as IDecodeToken;
    let user = null;
    let hasPermission = false;

    if (jwt.role === 'specialist') {
      user = this.specialistRep.getById({ id: jwt.id });
      user.role = 'specialist';
    }
    if (jwt.role === 'common' || jwt.role === 'admin') {
      user = this.customerRep.getById({ id: jwt.id });
      const roles = { 0: 'common', 1: 'admin' };
      user.role = roles[user.role];
    }

    const hasRole = () => roles.indexOf(user.role) > -1;

    if (hasRole()) {
      hasPermission = true;
    }

    return Boolean(user && hasPermission);
  }
}
