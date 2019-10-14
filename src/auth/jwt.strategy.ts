import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-jwt';

import { ConfigService } from '../config/config.service';
import { CurrentUser } from '../types';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly config: ConfigService) {
        super({
            jwtFromRequest: function(req: any): string {
                let token = null;
                if (req && req.cookies) {
                    token = req.cookies['token'];
                }
                return token;
            },
            ignoreExpiration: false,
            secretOrKey: config.get('JWT_SECRET'),
            usernameField: 'email'
        });
    }

    validate(payload: {
        sub: string;
        email: string;
        permissions: [];
    }): CurrentUser {
        return {
            id: payload.sub,
            email: payload.email,
            permissions: payload.permissions
        };
    }
}
