import {Injectable, UnauthorizedException} from '@nestjs/common';
import {UserService} from "@app/user/user.service";
import {LoginUserDto} from "@app/auth/dto/login-user.dto";
import {User} from "@app/user/entities/user.entity";
import {RegisterUserDto} from "@app/auth/dto/register-user.dto";
import {IdentifierResolver} from "@app/auth/utils/identifier-resolver";
import {HashService} from "@app/crypto/hash.service";
import {AccessToken, JwtService} from "@app/auth/jwt/jwt.service";
import {ResponseUserDto} from "@app/user/dto/response-user.dto";

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService,
        private readonly hashService: HashService
    ) {
    }

    async login(loginUserDto: LoginUserDto): Promise<AccessToken> {
        const {username: identifier, password} = loginUserDto

        const loginIdentifier = IdentifierResolver.resolve(identifier)
        const user = await this.userService.findOneBy(loginIdentifier)
        if (!user) throw new UnauthorizedException('Invalid credentials')

        await this.assertPasswordMatches(password, user.password)
        await this.rehashPasswordIfNeeded(user)

        return this.jwtService.issueAccessToken({sub: user.id})
    }

    async register(registerUserDto: RegisterUserDto): Promise<AccessToken> {
        const user = await this.userService.create(registerUserDto)
        return this.jwtService.issueAccessToken({sub: user.id})
    }

    async getAuthUser(id: string): Promise<User> {
        const user = await this.userService.findOneBy({id})
        if (!user) throw new UnauthorizedException('User not found')
        return new ResponseUserDto(user)
    }

    private async assertPasswordMatches(password: string, hashedPassword: string): Promise<void> {
        const isPasswordValid = await this.hashService.compare(password, hashedPassword)
        if (!isPasswordValid) {
            throw new UnauthorizedException('Invalid credentials')
        }
    }

    private async rehashPasswordIfNeeded(user: User): Promise<void> {
        const needsRehash = this.hashService.needsRehash(user.password)
        if (needsRehash) {
            user.password = await this.hashService.hash(user.password);
            await this.userService.save(user);
        }
    }

}
