import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UsersService } from '../users/users.service';
import { Country } from '@prisma/client';
import { CountriesMapper } from './countries.mapper';

@Injectable()
export class CountriesService {
	private readonly logger = new Logger(CountriesService.name);

	constructor(
		private readonly prismaService: PrismaService,
		private readonly usersService: UsersService,
		private readonly countriesMapper: CountriesMapper,
	) {}

	async update(userEmail: string, countryName: string) {
		const user = await this.usersService.getOrCreateUser(userEmail);
		await this.checkOrCreateCountry(countryName);

		const countries: Country[] = await this.prismaService.country.findMany({
			where: { name: countryName, users: { some: { email: userEmail } } },
		});

		if (countries.find((e) => e.name === countryName)) {
			return await this.prismaService.user.update({
				where: { email: userEmail },
				data: { countries: { disconnect: { name: countryName } } },
			});
		} else {
			return await this.prismaService.user.update({
				where: { email: userEmail },
				data: { countries: { connect: { name: countryName } } },
			});
		}
	}

	async get(userEmail: string) {
		const user = await this.prismaService.user.findUnique({
			where: { email: userEmail },
			include: { countries: true },
		});

		return this.countriesMapper.fromDOs(user.countries);
	}

	private async checkOrCreateCountry(countryName: string) {
		const country: Country = await this.prismaService.country.findUnique({
			where: { name: countryName },
		});

		if (!country?.id) {
			await this.prismaService.country.create({
				data: {
					name: countryName,
				},
			});
			return [];
		}
	}
}
