import { UseGuards } from '@nestjs/common';
import { Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import ms from 'ms';

import { ConfigService } from '../config/config.service';
import { ErrorService } from '../error/error.service';
import { PrismaService } from '../prisma/prisma.service';
import { AuthPayload, CurrentUser, Message, User } from '../types';
import { AuthService } from './auth.service';
import { CurrentUserDec } from './decorators/currentuser.decorator';
import { GqlAuthGuard } from './guards/graphqlauth.guard';
import { GqlLocalAuthGuard } from './guards/graphqllocal.guard';

@Resolver('Auth')
export class AuthResolver {
    constructor(
        private readonly prisma: PrismaService,
        private readonly authService: AuthService,
        private readonly config: ConfigService
    ) {}

    /**
     * Logs in the user.
     *
     * @param {*} ctx
     * @returns {Promise<AuthPayload>}
     * @memberof AuthResolver
     */
    @UseGuards(GqlLocalAuthGuard)
    @Mutation()
    async login(@Context() ctx): Promise<AuthPayload> {
        const { accessToken } = this.authService.login(ctx.req.user);
        ctx.res.cookie('token', accessToken, {
            httpOnly: true,
            maxAge: ms(this.config.get('COOKIE_EXPIRY_TIME'))
        });
        return {
            user: ctx.req.user,
            token: accessToken
        };
    }

    @Mutation()
    async logout(@Context() ctx): Promise<Message> {
        ctx.res.clearCookie('token');
        return { message: 'The user signed out' };
    }

    /**
     * Returns the current logged in user.
     * Gets user id from Express req.
     *
     * @param {CurrentUser} currentUser
     * @returns {(Promise<User | null>)}
     * @memberof AuthResolver
     */
    @UseGuards(GqlAuthGuard)
    @Query()
    async currentUser(
        @CurrentUserDec() currentUser: CurrentUser
    ): Promise<User | null> {
        const user = this.prisma.query.user({
            where: {
                id: currentUser.id
            }
        });

        if (!user) {
            ErrorService.notFound('Please log in.');
        }

        return user;
    }
}
