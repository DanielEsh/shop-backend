import { Controller, Get, Request, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { AuthService } from './auth/auth.service';

@Controller()
export class AppController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}

// curl http://localhost:8000/api/profile
// curl -X POST http://localhost:8000/api/auth/login -d '{"username": "john", "password": "changeme"}' -H "Content-Type: application/json"
// curl http://localhost:8000/api/profile -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImpvaG4iLCJzdWIiOjEsImlhdCI6MTY1NjI2NDYyNywiZXhwIjoxNjU2MjY0Njg3fQ.bsnIKvCG0FTQ5LOafR67mfDWy_euFx88vvcMrRABxfc"