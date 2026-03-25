import {Body, ClassSerializerInterceptor, Controller, Get, Param, Patch, Post, UseInterceptors} from '@nestjs/common';
import {UserService} from "@app/user/user.service";
import {User} from "@app/user/entities/user.entity";
import {CreateUserDto} from "@app/user/dto/create-user.dto";
import {UpdateUserDto} from "@app/user/dto/update-user.dto";

@Controller('users')
@UseInterceptors(ClassSerializerInterceptor)
export class UserController {
    constructor(
        private readonly userService: UserService,
    ) {
    }

    @Get('/')
    findAll(): Promise<User[]> {
        return this.userService.findAll()
    }

    @Get('/:id')
    findOne(
        @Param('id') id: string
    ): Promise<User> {
        return this.userService.findOne(id)
    }

    @Post('/')
    create(
        @Body() createUserDto: CreateUserDto
    ): Promise<User> {
        return this.userService.create(createUserDto);
    }

    @Patch('/:id')
    update(
        @Param('id') id: string,
        @Body() updateUserDto: UpdateUserDto
    ): Promise<User> {
        return this.userService.update(id, updateUserDto);
    }

}
