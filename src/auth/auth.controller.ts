import { Body, HttpCode, Post } from '@nestjs/common';
import { Controller } from '@nestjs/common';

import { AuthDto } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
  @Post('register')
  async register(@Body() dto: AuthDto) {
    console.log(dto);
  }

  @HttpCode(200)
  @Post('login')
  async login(@Body() dto: AuthDto) {
    console.log(dto);
  }
}
