import { Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/jwt/jwt-auth.guard';

@Controller('users')
export class UsersController {
	constructor(private readonly usersService: UsersService) {}

	@Get()
	@UseGuards(JwtAuthGuard)
	getUserAuth(@Query('email') email: string) {
		return this.usersService.getOrCreateUser(email);
	}

	@Get('no-auth')
	getUserNoAuth(@Query('email') email: string) {
		return this.usersService.getOrCreateUser(email);
	}
}
