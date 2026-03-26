import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import {IS_PUBLIC_KEY} from '@app/auth/decorators/public.decorator';
import {Reflector} from '@nestjs/core';
import {JwtService} from '@app/auth/jwt/jwt.service';
import {AuthRequest} from '@app/common/types/auth.types';
import {LoggerService} from '@app/common/logger/logger.service';
import {StringFormatter} from "@app/common/utils/string-formatter.utils";

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private jwtService: JwtService,
        private reflector: Reflector,
        private logger: LoggerService,
    ) {
        this.logger = new LoggerService(AuthGuard.name);
    }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);

        if (isPublic) {
            return true;
        }

        const request: AuthRequest = context
            .switchToHttp()
            .getRequest<AuthRequest>();

        const token = this.extractTokenFromHeader(request);
        if (!token) {
            throw new UnauthorizedException();
        }
        try {
            request['user'] = await this.jwtService.verifyAsync(token);
        } catch (error) {
            this.logger.warn('AUTH_TOKEN_VERIFICATION_FAILED', {error});
            throw new UnauthorizedException(StringFormatter.toTitleCase(error.message));
        }
        return true;
    }

    private extractTokenFromHeader(request: AuthRequest): string | undefined {
        const [type, token] = request.headers.authorization?.split(' ') ?? [];
        return type === 'Bearer' ? token : undefined;
    }
}
