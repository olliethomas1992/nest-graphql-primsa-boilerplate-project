import { Injectable } from '@nestjs/common';

import { ConfigService } from '../config/config.service';
import { Prisma } from './prisma.binding';

@Injectable()
export class PrismaService extends Prisma {
    constructor(config: ConfigService) {
        super({
            endpoint: config.get('PRISMA_ENDPOINT'),
            debug: false,
            secret: config.get('PRISMA_MANAGEMENT_API_SECRET')
        });
    }
}
