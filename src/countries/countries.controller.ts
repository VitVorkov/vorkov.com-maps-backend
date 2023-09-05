import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt/jwt-auth.guard';
import { CountriesService } from './countries.service';

@Controller('countries')
export class CountriesController {
	constructor(private readonly countriesService: CountriesService) {}

	@Get()
	@UseGuards(JwtAuthGuard)
	getCountries(@Query('email') email: string) {
		return this.countriesService.get(email);
	}

	@Post('update')
	@UseGuards(JwtAuthGuard)
	updateCountry(
		@Body('email') email: string,
		@Body('country') country: string,
	) {
		return this.countriesService.update(email, country);
	}
}
