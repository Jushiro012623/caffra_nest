import {
    Body,
    Controller,
    Get,
    Post,
    UseGuards,
    ClassSerializerInterceptor,
    Request,
    UseInterceptors,
} from '@nestjs/common';
import {AuthService} from '@app/auth/auth.service';
import {LoginUserDto} from '@app/auth/dto/login-user.dto';
import {RegisterUserDto} from '@app/auth/dto/register-user.dto';
import {AuthGuard} from '@app/auth/guard/auth.guard';
import {User} from '@app/user/entities/user.entity';
import type {AccessToken} from '@app/common/types/response.type';
import type {AuthRequest} from "@app/common/types/request.type";

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {
    }

    @Post('/login')
    login(@Body() payload: LoginUserDto): Promise<AccessToken> {
        return this.authService.login(payload);
    }

    @Post('/register')
    register(
        @Body() payload: RegisterUserDto,
        @Request() request: AuthRequest,
    ): Promise<AccessToken> {
        return this.authService.register(payload, request);
    }

    @Get('/user')
    @UseGuards(AuthGuard)
    @UseInterceptors(ClassSerializerInterceptor)
    getUser(@Request() request: { user: { sub: string } }): Promise<User> {
        return this.authService.getAuthUser(request.user.sub);
    }
}
