import { UseGuards } from '@nestjs/common';
import { Args, Info, Mutation, Query, Resolver } from '@nestjs/graphql';
import { hash } from 'bcryptjs';

import { GqlAuthGuard } from '../auth/guards/graphqlauth.guard';
import { ErrorService } from '../error/error.service';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserInput, User } from '../types';

@Resolver()
export class UsersResolver {
    constructor(private readonly prisma: PrismaService) {}

    @UseGuards(GqlAuthGuard)
    @Query('users')
    async users(@Args() args: any, @Info() info: any): Promise<User[]> {
        return await this.prisma.query.users(args, info);
    }

    @Query('hello')
    async hello(@Args() args: any): Promise<string> {
        return `Hello ${args.name}`;
    }

    @Mutation('createUser')
    async createUser(@Args('data') data: CreateUserInput): Promise<User> {
        // Check if email is already taken
        const emailTaken = await this.prisma.exists.User({
            email: data.email
        });

        if (emailTaken) {
            ErrorService.conflict('Email is already taken');
        }

        if (data.password.length < 8) {
            ErrorService.badRequest('Password is not of correct length');
        }

        // Create a secure password
        const password = await hash(data.password, 10);
        // Create the user
        const user = await this.prisma.mutation.createUser({
            data: {
                ...data,
                password,
                permissions: { set: ['USER'] }
            }
        });
        // Return the auth payload
        return user;
    }
}
