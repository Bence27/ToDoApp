import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDtoForAdmin, AuthDtoLogin, AuthDtoSignUp } from './dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  signup(@Body() dto: AuthDtoSignUp) {
    return this.authService.signup(dto);
  }

  @Post('login')
  login(@Body() dto: AuthDtoLogin) {
    return this.authService.login(dto);
  }

  @Post('admin')
  getAccessForAdmin(@Body() dto: AuthDtoForAdmin) {
    return this.authService.getAccessForAdmin(dto);
  }
}
