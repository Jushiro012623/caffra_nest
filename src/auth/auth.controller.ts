import {
    Body,
    Controller,
    Get,
    Request,
    Post,
    UseGuards,
    ClassSerializerInterceptor,
    UseInterceptors
} from '@nestjs/common';
import {AuthService} from "@app/auth/auth.service";
import {LoginUserDto} from "@app/auth/dto/login-user.dto";
import {RegisterUserDto} from "@app/auth/dto/register-user.dto";
import {AuthGuard} from "@app/auth/guard/auth.guard";
import {AccessToken} from "@app/auth/jwt/jwt.service";
import {ResponseUserDto} from "@app/user/dto/response-user.dto";

@Controller('auth')
export class AuthController {

    constructor(private readonly authService: AuthService) {
    }

    @Post('/login')
    login(@Body() loginUserDto: LoginUserDto): Promise<AccessToken> {
        return this.authService.login(loginUserDto);
    }

    @Post('/register')
    register(@Body() registerUserDto: RegisterUserDto): Promise<AccessToken> {
        return this.authService.register(registerUserDto);
    }

    @Get('/user')
    @UseGuards(AuthGuard)
    @UseInterceptors(ClassSerializerInterceptor)
    getUser(@Request() request: { user: { sub: string } }): Promise<ResponseUserDto> {
        return this.authService.getAuthUser(request.user.sub);
    }

}
