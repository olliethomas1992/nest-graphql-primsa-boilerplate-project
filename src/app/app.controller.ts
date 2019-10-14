import { Controller, Get } from '@nestjs/common';

@Controller('')
export class AppController {
    @Get()
    isRunning(): string {
        return 'The NestJs GraphQl app is running.';
    }
}
