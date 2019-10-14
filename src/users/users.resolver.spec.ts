import { Test, TestingModule } from '@nestjs/testing';
import { UsersResolver } from './users.resolver';

describe('UsersResolver', () => {
    let resolver: UsersResolver;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [UsersResolver],
        }).compile();

        resolver = module.get<UsersResolver>(UsersResolver);
    });
});
