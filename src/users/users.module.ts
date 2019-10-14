import { Module } from '@nestjs/common';
import { UsersResolver } from './users.resolver';
import { PrismaModule } from '../prisma/prisma.module';
import { AuthModule } from '../auth/auth.module';
import { UsersService } from './users.service';

@Module({
    imports: [PrismaModule, AuthModule],
    providers: [UsersResolver, UsersService]
})
export class UsersModule { }
