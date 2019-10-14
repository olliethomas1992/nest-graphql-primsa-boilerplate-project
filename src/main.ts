import { NestFactory } from '@nestjs/core';
import cookieParser from 'cookie-parser';

import { AppModule } from './app/app.module';

async function bootstrap(): Promise<boolean> {
    const app = await NestFactory.create(AppModule);
    app.use(cookieParser());
    await app.listen(
        process.env.PORT || app.get('ConfigService').get('APP_PORT')
    );
    return true;
}
bootstrap();
