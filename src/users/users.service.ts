import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { User } from '@prisma/client';

@Injectable()
export class UsersService {
	constructor(private readonly prismaService: PrismaService) {}
	private readonly logger = new Logger(UsersService.name);

	async create(email: string) {
		const user: User = await this.prismaService.user.findUnique({
			where: { email: email },
		});
		if (!user?.id) {
			return await this.prismaService.user.create({
				data: { email: email },
			});
		} else {
			throw new BadRequestException({
				message: 'User already exists',
				statusCode: '400',
			});
		}
	}

	async get(email: string) {
		return await this.prismaService.user.findUnique({
			where: { email: email },
		});
	}
}
