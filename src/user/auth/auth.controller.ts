import {Body, Controller, Post} from '@nestjs/common';
import {User} from "@app/user/entities/user.entity";
import {AuthService} from "@app/user/auth/auth.service";
import {LoginDto} from "@app/user/auth/dto/login.dto";
import {AccessToken} from "@app/user/auth/auth.types";
import {RegisterDto} from "@app/user/auth/dto/register.dto";

@Controller('auth')
export class AuthController {

    constructor(
        private readonly auth: AuthService) {
    }

    @Post('login')
    login(@Body() loginDto: LoginDto): Promise<AccessToken> {
        return this.auth.login(loginDto)
    }

    @Post('register')
    register(@Body() registerDto: RegisterDto): Promise<any> {
        return this.auth.register(registerDto)
    }

    @Post('logout')
    logout(): string {
        return 'logout'
    }
}
