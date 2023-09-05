import { PassportStrategy } from '@nestjs/passport';
import { Injectable, Logger } from '@nestjs/common';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { passportJwtSecret } from 'jwks-rsa';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
	private readonly logger = new Logger('AUTHENTICATION');

	constructor() {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			secretOrKeyProvider: passportJwtSecret({
				cache: true,
				rateLimit: true,
				jwksRequestsPerMinute: 5,
				jwksUri: `${process.env.AUTH0_ISSUER_BASE_URL}.well-known/jwks.json`,
			}),
			audience: process.env.AUTH0_AUDIENCE_BASE_URL,
			issuer: process.env.AUTH0_ISSUER_BASE_URL,
			algorithms: ['RS256'],
		});
	}
	async validate(payload) {
		return payload;
	}
}
