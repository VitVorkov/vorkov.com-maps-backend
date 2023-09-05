import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { CountriesModule } from './countries/countries.module';

@Module({
	imports: [UsersModule, AuthModule, CountriesModule],
	controllers: [],
	providers: [],
})
export class AppModule {}
