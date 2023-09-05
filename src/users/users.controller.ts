import { Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/jwt/jwt-auth.guard';

@Controller('users')
export class UsersController {
	constructor(private readonly usersService: UsersService) {}

	@Post()
	createUser(@Query('email') email: string) {
		return this.usersService.create(email);
	}

	@Get()
	getUser(@Query('name') name: string) {
		return this.usersService.get(name);
	}

	@Get('auth')
	@UseGuards(JwtAuthGuard)
	getUserAuth(@Query('email') email: string) {
		return this.usersService.get(email);
	}
}
