import {Injectable, Request, UnauthorizedException} from '@nestjs/common';
import {LoginDto} from "@app/user/auth/dto/login.dto";
import {UserService} from "@app/user/user.service";
import {JwtService} from "@nestjs/jwt";
import {AccessToken, JwtPayload} from "@app/user/auth/auth.types";
import {RegisterDto} from "@app/user/auth/dto/register.dto";
import {User} from "@app/user/entities/user.entity";
import {Password} from "@app/user/helper/password.helper";
import {UserResponseDto} from "@app/user/dto/user-response.dto";

@Injectable()
export class AuthService {

    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService,
    ) {
    }

    async login(loginDto: LoginDto): Promise<AccessToken> {
        const {username, password} = loginDto

        const user: User | null = await this.userService.findOneBy({
            where: [
                {username: username},
                {email: username},
                {mobile_number: username}
            ],
            relations: ['roles']
        })

        if (!user) {
            throw new UnauthorizedException("Invalid credentials")
        }

        const passwordMatched = await Password.compare(password, user.password)
        if (!passwordMatched) {
            throw new UnauthorizedException("Invalid credentials")
        }

        if (Password.needsRehash(user.password)) {
            user.password = await Password.hash(password);
            await this.userService.save(user);
        }

        return this.generateAccessToken(user)
    }

    async register(registerDto: RegisterDto): Promise<AccessToken> {
        const user = await this.userService.create(registerDto)
        return this.generateAccessToken(user)
    }

    async getProfile(request: { user: JwtPayload }): Promise<UserResponseDto> {
        const user = await this.userService.findOneBy({
            where: {id: request.user.sub},
            relations: ['roles'],
        });

        if (!user) {
            throw new UnauthorizedException("Invalid credentials")
        }

        return new UserResponseDto(user);
    }

    private async generateAccessToken(user: User): Promise<AccessToken> {

        const roles = (user.roles).map(role => role.slug)

        const accessToken: string = await this.jwtService.signAsync({sub: user.id, roles} as JwtPayload)

        return {
            token_type: 'Bearer',
            access_token: accessToken
        }
    }

}
