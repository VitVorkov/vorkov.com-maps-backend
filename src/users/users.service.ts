import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { User } from '@prisma/client';

@Injectable()
export class UsersService {
	constructor(private readonly prismaService: PrismaService) {}
	private readonly logger = new Logger(UsersService.name);

	async checkOrCreateUser(email: string): Promise<User> {
		const user: User = await this.prismaService.user.findUnique({
			where: { email: email },
			include: { countries: true },
		});
		if (!user?.id) {
			return await this.prismaService.user.create({
				data: { email: email },
				include: { countries: true },
			});
		} else {
			return user;
		}
	}
}
