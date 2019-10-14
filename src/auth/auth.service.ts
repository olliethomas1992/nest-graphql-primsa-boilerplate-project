import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcryptjs';

import { ErrorService } from '../error/error.service';
import { PrismaService } from '../prisma/prisma.service';
import { User } from '../types';

@Injectable()
export class AuthService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly jwtService: JwtService
    ) {}

    // TODO Using Any
    async validateUser(email: string, password: string): Promise<User | null> {
        // Find the user via Email
        const user = await this.prisma.query.user(
            {
                where: {
                    email
                }
            },
            '{ id name email password permissions }'
        );

        if (!user) {
            ErrorService.notFound('User not found!');
        }

        // Check if the users passwords match
        const isMatch = await compare(password, user.password);

        if (isMatch) {
            return user;
        } else {
            return null;
        }
    }

    login(user: User): { accessToken: string } {
        const payload = {
            email: user.email,
            sub: user.id,
            permissions: user.permissions
        };
        return {
            accessToken: this.jwtService.sign(payload)
        };
    }
}
