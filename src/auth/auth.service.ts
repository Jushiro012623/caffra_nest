import {Injectable, UnauthorizedException} from '@nestjs/common';
import {UserService} from '@app/user/user.service';
import {LoginUserDto} from '@app/auth/dto/login-user.dto';
import {User} from '@app/user/entities/user.entity';
import {RegisterUserDto} from '@app/auth/dto/register-user.dto';
import {
    IdentifierResolver,
    UserIdentifierType,
} from '@app/auth/utils/identifier-resolver';
import {HashService} from '@app/crypto/hash.service';
import {ResponseUserDto} from '@app/user/dto/response-user.dto';
import {LoggerService} from '@app/common/logger/logger.service';
import {JwtService} from '@app/auth/jwt/jwt.service';
import {AccessToken, AuthRequest} from '@app/common/types/auth.types';
import {StringFormatter} from "@app/common/utils/string-formatter.utils";

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService,
        private readonly hashService: HashService,
        private logger: LoggerService,
    ) {
        this.logger.setContext(AuthService.name);
    }

    async login(payload: LoginUserDto): Promise<AccessToken> {
        const {username: identifier, password} = payload;

        const loginIdentifier: IdentifierResolver = new IdentifierResolver(
            identifier,
        );
        const user: User | null = await this.userService.findOneBy(
            loginIdentifier.resolve(),
            {relations: ['roles']},
        );
        if (!user) throw new UnauthorizedException('Invalid credentials');

        await this.assertPasswordMatches(password, user.password);
        await this.rehashPasswordIfNeeded(user, password);

        const identifierValue: string = StringFormatter.mask(identifier, {
            end: -4,
        });
        const identifierKey: UserIdentifierType = loginIdentifier.getKey();

        this.logger.log(`AUTH_LOGIN_SUCCESS`, {
            id: user.id,
            identifierValue,
            identifierKey,
        });

        const roles = user.roles.map((role) => role.slug);
        return this.jwtService.issueAccessToken({sub: user.id, roles});
    }

    async register(
        payload: RegisterUserDto,
        request: AuthRequest,
    ): Promise<AccessToken> {
        const user: User = await this.userService.create(payload, request);
        this.logger.log(`AUTH_REGISTER_SUCCESS`, {id: user.id});

        const roles = user.roles.map((role) => role.slug);

        return this.jwtService.issueAccessToken({sub: user.id, roles});
    }

    async getAuthUser(id: string): Promise<User> {
        const user: User | null = await this.userService.findOneBy({id});
        if (user) return new ResponseUserDto(user);

        this.logger.warn(`AUTH_TOKEN_USER_MISMATCH`, {id});
        throw new UnauthorizedException('User not found');
    }

    private async assertPasswordMatches(
        password: string,
        hashedPassword: string,
    ): Promise<void> {
        const isPasswordValid: boolean = await this.hashService.compare(
            password,
            hashedPassword,
        );
        if (!isPasswordValid) {
            throw new UnauthorizedException('Invalid credentials');
        }
    }

    private async rehashPasswordIfNeeded(
        user: User,
        password: string,
    ): Promise<void> {
        const needsRehash: boolean = this.hashService.needsRehash(user.password);
        if (!needsRehash) return;

        const emailHint: string = StringFormatter.mask(user.email, {
            start: 1,
            end: -10,
        });

        this.logger.warn('AUTH_PASSWORD_NEEDS_REHASHING', {
            id: user.id,
            emailHint,
        });

        await this.userService.updatePassword(user, password);

        this.logger.log('AUTH_PASSWORD_REHASHED', {id: user.id, emailHint});
    }
}
