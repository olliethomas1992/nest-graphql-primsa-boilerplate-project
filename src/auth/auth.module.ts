import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import ms from 'ms';

import { ConfigModule } from '../config/config.module';
import { ConfigService } from '../config/config.service';
import { PrismaModule } from '../prisma/prisma.module';
import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { LocalStrategy } from './local.strategy';

@Module({
    imports: [
        ConfigModule,
        PrismaModule,
        PassportModule,
        PassportModule.register({ defaultStrategy: 'jwt' }),
        JwtModule.registerAsync({
            imports: [ConfigModule],
            useFactory: async (config: ConfigService) => {
                return {
                    secret: config.get('JWT_SECRET'),
                    signOptions: {
                        expiresIn: config.get('COOKIE_EXPIRY_TIME')
                    }
                };
            },
            inject: [ConfigService]
        })
    ],
    providers: [AuthService, LocalStrategy, AuthResolver, JwtStrategy],
    exports: [AuthService],
    controllers: []
})
export class AuthModule {}
