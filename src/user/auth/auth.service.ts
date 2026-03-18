import {Injectable, UnauthorizedException} from '@nestjs/common';
import {LoginDto} from "@app/user/auth/dto/login.dto";
import {UserService} from "@app/user/user.service";
import {JwtService} from "@nestjs/jwt";
import {AccessToken, JwtPayload} from "@app/user/auth/auth.types";
import {RegisterDto} from "@app/user/auth/dto/register.dto";
import {InjectRepository} from "@nestjs/typeorm";
import {User} from "@app/user/entities/user.entity";
import {Repository} from "typeorm";
import {Password} from "@app/user/helper/password.helper";

@Injectable()
export class AuthService {

    constructor(
        @InjectRepository(User)
        private readonly user: Repository<User>,
        private readonly userService: UserService,
        private readonly jwtService: JwtService,
    ) {
    }

    async login(loginDto: LoginDto): Promise<AccessToken> {
        const {username, password} = loginDto

        const {password: hashedPassword, id} = await this.userService.findOne(username)

        const passwordMatched = await new Password(password).matches(hashedPassword)
        if (!passwordMatched) {
            throw new UnauthorizedException("Invalid credentials")
        }

        return await this.signJwtToken(id.toString())
    }

    async register(registerDto: RegisterDto): Promise<any> {
        const {confirm_password, ...user} = registerDto

        const {id} = await this.user.save(this.user.create(user))

        return await this.signJwtToken(id.toString())
    }

    private async signJwtToken(sub: string): Promise<AccessToken> {
        return {
            token_type: 'Bearer',
            access_token: await this.jwtService.signAsync({sub} as JwtPayload),
        }
    }

}
