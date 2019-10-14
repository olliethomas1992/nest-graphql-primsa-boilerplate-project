import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';

import { AuthModule } from '../auth/auth.module';
import { ConfigModule } from '../config/config.module';
import { ConfigService } from '../config/config.service';
import { ErrorModule } from '../error/error.module';
import { PrismaModule } from '../prisma/prisma.module';
import { resolvers } from '../resolvers';
import { UsersModule } from '../users/users.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
    imports: [
        GraphQLModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: async (config: ConfigService) => ({
                typePaths: ['src/**/*.graphql'],
                resolvers,
                context: ({ req, res }) => ({ req, res }),
                cors: {
                    credentials: true,
                    origin: config.get('FRONTEND_URL')
                }
            }),
            inject: [ConfigService]
        }),
        PrismaModule,
        UsersModule,
        ConfigModule,
        AuthModule,
        ErrorModule
    ],
    controllers: [AppController],
    providers: [AppService]
})
export class AppModule {}
