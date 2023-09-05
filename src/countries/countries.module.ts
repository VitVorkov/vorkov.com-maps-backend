import { Module } from '@nestjs/common';
import { CountriesService } from './countries.service';
import { PrismaService } from '../prisma/prisma.service';
import { CountriesController } from './countries.controller';
import { UsersService } from '../users/users.service';
import { CountriesMapper } from './countries.mapper';

@Module({
	providers: [CountriesService, PrismaService, UsersService, CountriesMapper],
	controllers: [CountriesController],
})
export class CountriesModule {}
