import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';

import { ErrorService } from '../error/error.service';
import { AuthService } from './auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly authService: AuthService) {
        super({
            usernameField: 'email'
        });
    }

    /**
     * Attempts to validate the user with email and password.
     *
     * @param {string} email
     * @param {string} password
     * @returns {Promise<any>}
     * @memberof LocalStrategy
     */
    async validate(email: string, password: string): Promise<any> {
        const user = await this.authService.validateUser(email, password);
        if (!user) {
            ErrorService.unauthorized('Invalid Username or Password!');
        }
        return user;
    }
}
