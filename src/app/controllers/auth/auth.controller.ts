import { Body, Controller, Post, Query } from '@nestjs/common';

import { ILoginResponse, IRegistrationResponse, LoginDto, RegistrationDto } from '@app/controllers/auth';
import { AuthService } from '@app/services/auth';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('registration')
  async registration(
    @Query('role') role: 'customer'| 'specialist',
    @Body() dto: RegistrationDto
  ): Promise<IRegistrationResponse> {
    let token = null;

    if (role === 'customer') {
      token = await this.authService.registrationCustomer(dto);
    }

    if (role === 'specialist') {
      token = await this.authService.registrationSpecialist(dto);
    }

    return { token };
  }

  @Post('login')
  async login(
    @Query('role') role: 'customer'| 'specialist',
    @Body() dto: LoginDto
  ): Promise<ILoginResponse> {
    let token = null;

    if (role === 'customer') {
      token = await this.authService.loginCustomer(dto);
    }

    if (role === 'specialist') {
      token = await this.authService.loginSpecialist(dto);
    }

    return { token };
  }
}
