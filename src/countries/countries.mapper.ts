import { Injectable } from '@nestjs/common';
import { Country } from '@prisma/client';
import { CountryDto } from './dto/country.dto';

@Injectable()
export class CountriesMapper {
	public fromDO(countryDo: Country): CountryDto | null {
		if (!countryDo) return null;

		return new CountryDto({
			name: countryDo.name,
		});
	}
	public fromDOs(countryDos: Country[]): CountryDto[] | null {
		let result: CountryDto[] = new Array();

		for (const country of countryDos) {
			result.push(this.fromDO(country));
		}

		return result;
	}
}
