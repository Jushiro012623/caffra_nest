import {
    Body,
    ClassSerializerInterceptor,
    Controller,
    Get,
    Request,
    Post,
    UseInterceptors, UseGuards
} from '@nestjs/common';
import {AuthService} from "@app/user/auth/auth.service";
import {LoginDto} from "@app/user/auth/dto/login.dto";
import {AccessToken, JwtPayload} from "@app/user/auth/auth.types";
import {RegisterDto} from "@app/user/auth/dto/register.dto";
import {UserResponseDto} from "@app/user/dto/user-response.dto";
import {Public} from "@app/user/auth/decorators/auth.decorator";

@Controller('auth')
export class AuthController {

    constructor(
        private readonly auth: AuthService) {
    }

    @Public()
    @Post('login')
    login(@Body() loginDto: LoginDto): Promise<AccessToken> {
        return this.auth.login(loginDto)
    }

    @Public()
    @Post('register')
    register(@Body() registerDto: RegisterDto): Promise<any> {
        return this.auth.register(registerDto)
    }

    @Get('profile')
    @UseInterceptors(ClassSerializerInterceptor)
    getProfile(@Request() request: { user: JwtPayload }): Promise<UserResponseDto> {
        return this.auth.getProfile(request);
    }
}
