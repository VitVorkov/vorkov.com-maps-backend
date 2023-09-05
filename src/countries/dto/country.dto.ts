export class CountryDto {
	constructor(init: Partial<CountryDto>) {
		this.id = init.id;
		this.name = init.name;
	}

	public id?: string;
	public name: string;
}
