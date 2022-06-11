import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Transaction, TransactionRepository } from 'typeorm';
import { createHmac, pbkdf2Sync, timingSafeEqual } from 'crypto';

import { generateJwtToken } from '@src/utils';
import { CustomerService } from '@app/services/customer';
import { SpecialistService } from '@app/services/specialist';
import { ILoginParam, IRegistration } from '@app/services/auth';
import { CustomerRepository } from '@app/repositories/customer';
import { SpecialistRepository } from '@app/repositories/specialist';
import { Roles } from '@app/interfaces';
import { LocationService } from '@app/services/location';

@Injectable()
export class AuthService {
  constructor(
    private readonly customerService: CustomerService,
    private readonly specialistService: SpecialistService,
    private readonly locationService: LocationService,
  ) {}

  @Transaction()
  async loginCustomer(
    { login, password }: ILoginParam,
    @TransactionRepository() customerRep?: CustomerRepository,
  ): Promise<string> {
    const customer = await this.customerService.getByPhoneOrEmail({ login }, customerRep);

    if (!customer) {
      throw new HttpException('Пользователь не найден', HttpStatus.BAD_REQUEST);
    }

    const hashedPassword = this.hash(password);

    if (!timingSafeEqual(Buffer.from(customer.password), Buffer.from(hashedPassword))) {
      throw new HttpException('Неверный пароль', HttpStatus.BAD_REQUEST);
    }

    const token = generateJwtToken({ id: customer.id, role: Roles[customer.role] });

    await this.customerService.updateToken({ id: customer.id, token: this.hmac(token) });

    return token;
  }

  @Transaction()
  async loginSpecialist(
    { login, password }: ILoginParam,
    @TransactionRepository() specialistRep?: SpecialistRepository,
  ): Promise<string> {
    const specialist = await this.specialistService.getByPhoneOrEmail({ login });

    if (!specialist) {
      throw new HttpException('Пользователь не найден', HttpStatus.BAD_REQUEST);
    }

    const hashedPassword = this.hash(password);

    if (!timingSafeEqual(Buffer.from(specialist.password), Buffer.from(hashedPassword))) {
      throw new HttpException('Неверный пароль', HttpStatus.BAD_REQUEST);
    }

    const token = generateJwtToken({ id: specialist.id, role: 'specialist' });

    await this.specialistService.updateToken({ id: specialist.id, token: this.hmac(token) }, specialistRep);

    return token;
  }

  @Transaction()
  async registrationCustomer(
    dto: IRegistration,
    @TransactionRepository() customerRep?: CustomerRepository,
  ): Promise<string> {
    const existPhone = await this.customerService.getByPhoneOrEmail({ login: dto.phone }, customerRep);
    if (existPhone) {
      throw new HttpException('Пользователь с таким номером телефона уже зарегистрирован', HttpStatus.BAD_REQUEST);
    }

    const existEmail = await this.customerService.getByPhoneOrEmail({ login: dto.email }, customerRep);
    if (existEmail) {
      throw new HttpException('Пользователь с такой почтой уже зарегистрирован', HttpStatus.BAD_REQUEST);
    }

    const location = await this.locationService.getLocation({ id: dto.locationId });
    if (!location) {
      throw new HttpException('Локация не найдена', HttpStatus.BAD_REQUEST);
    }

    const customer = await this.customerService.createCustomer({ ...dto, password: this.hash(dto.password) });

    const token = generateJwtToken({ id: customer.id, role: Roles[customer.role] });

    await this.customerService.updateToken({ id: customer.id, token: this.hmac(token) }, customerRep);

    return token;
  }

  @Transaction()
  async registrationSpecialist(
    dto: IRegistration,
    @TransactionRepository() specialistRep?: SpecialistRepository,
  ): Promise<string> {
    const existPhone = await this.specialistService.getByPhoneOrEmail({ login: dto.phone }, specialistRep);
    if (existPhone) {
      throw new HttpException('Пользователь с таким номером телефона уже зарегистрирован', HttpStatus.BAD_REQUEST);
    }

    const existEmail = await this.specialistService.getByPhoneOrEmail({ login: dto.email }, specialistRep);
    if (existEmail) {
      throw new HttpException('Пользователь с такой почтой уже зарегистрирован', HttpStatus.BAD_REQUEST);
    }

    const location = await this.locationService.getLocation({ id: dto.locationId });
    if (!location) {
      throw new HttpException('Локация не найдена', HttpStatus.BAD_REQUEST);
    }

    const specialist = await this.specialistService.createSpecialist({ ...dto, password: this.hash(dto.password) });

    const token = generateJwtToken({ id: specialist.id, role: 'specialist' });

    await this.specialistService.updateToken({ id: specialist.id, token: this.hmac(token) }, specialistRep);

    return token;
  }

  private hash(password: string) {
    try {
      const { PASS_ITERATIONS, PASS_SALT, PASS_KEYLEN, PASS_DIGEST } = process.env;
      return pbkdf2Sync(password, PASS_SALT, Number(PASS_ITERATIONS), Number(PASS_KEYLEN), PASS_DIGEST).toString(`hex`);
    } catch (err) {
      throw new HttpException('Не получилось войти на портал', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  private hmac(token: string) {
    try {
      const { JWT_SALT } = process.env;
      return createHmac('sha512', JWT_SALT).update(token)
        .digest('hex');
    } catch (err) {
      return null;
    }
  }
}
