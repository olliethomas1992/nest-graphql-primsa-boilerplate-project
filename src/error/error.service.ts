import {
    BadRequestException,
    ConflictException,
    ForbiddenException,
    Injectable,
    NotFoundException,
    UnauthorizedException
} from '@nestjs/common';

@Injectable()
export class ErrorService {
    public static forbidden(message: string): void {
        throw new ForbiddenException(message);
    }

    public static notFound(message: string): void {
        throw new NotFoundException(message);
    }

    public static unauthorized(message = ''): void {
        throw new UnauthorizedException(message);
    }

    public static conflict(message = ''): void {
        throw new ConflictException(message);
    }

    public static badRequest(message = ''): void {
        throw new BadRequestException(message);
    }
}
