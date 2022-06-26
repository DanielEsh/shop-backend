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
// curl http://localhost:8000/api/profile -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImpvaG4iLCJzdWIiOjEsImlhdCI6MTY1NjI2NDcxMywiZXhwIjoxNjU2MjY0NzczfQ.8K3Sl0yAk8J0a5SY7E8xz_F8wUpnqsXn2gvCZjYE4_U"

// curl -X POST http://localhost:8000/api/auth/login -d '{"username": "name", "password": "password"}' -H "Content-Type: application/json"
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NTYyNjgyNzEsImV4cCI6MTY1NjI2ODMzMX0.5SPnzoHxpjiOT_n_Pjp581td7NPDoXmitB5SiOHrv1U
// curl http://localhost:8000/api/profile -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NTYyNjg2NTUsImV4cCI6MTY1NjI2ODcxNX0.5uI5Nuzo-4YXzScVUmzVHB6SYJLoz4bYoMXPpqCHNLc"

