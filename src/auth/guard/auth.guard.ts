import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import {IS_PUBLIC_KEY} from '@app/auth/decorators/public.decorator';
import {Reflector} from '@nestjs/core';
import {Request} from 'express';
import {JwtPayload} from 'jsonwebtoken';
import {JwtService} from '@app/auth/jwt/jwt.service';
import {AuthRequest} from "@app/common/types/auth.types";


@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private jwtService: JwtService,
        private reflector: Reflector,
    ) {
    }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);

        if (isPublic) {
            return true;
        }

        const request: AuthRequest = context.switchToHttp().getRequest<AuthRequest>();

        const token = this.extractTokenFromHeader(request);
        if (!token) {
            throw new UnauthorizedException();
        }
        try {
            request['user'] = await this.jwtService.verifyAsync(token);
        } catch {
            throw new UnauthorizedException();
        }
        return true;
    }

    private extractTokenFromHeader(request: AuthRequest): string | undefined {
        const [type, token] = request.headers.authorization?.split(' ') ?? [];
        return type === 'Bearer' ? token : undefined;
    }
}
