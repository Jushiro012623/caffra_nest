import {
    Body,
    ClassSerializerInterceptor,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
    SerializeOptions,
    UseInterceptors
} from '@nestjs/common';
import {UserService} from "@app/user/user.service";
import {UserResponseDto} from "@app/user/dto/user-response.dto";
import {CreateUserDto} from "@app/user/dto/create-user.dto";
import {UpdateUserDto} from "@app/user/dto/update-user.dto";
import {Roles} from "@app/user/roles/decorators/roles.decorator";
import {RoleEnum} from "@app/user/roles/enums/role.enum";

@UseInterceptors(ClassSerializerInterceptor)
@Roles(RoleEnum.Admin)
@Controller('users')
export class UserController {
    constructor(
        private readonly userService: UserService
    ) {
    }

    @Get('/')
    findAll(): Promise<UserResponseDto[]> {
        return this.userService.findAll();
    }

    @Get('/:id')
    @SerializeOptions({groups: ['timestamps']})
    findOne(@Param('id') id: string): Promise<UserResponseDto> {
        return this.userService.findById(id)
    }

    @Post('/')
    @SerializeOptions({groups: ['timestamps']})
    create(@Body() createUserDto: CreateUserDto): Promise<UserResponseDto> {
        return this.userService.create(createUserDto)
    }

    @Patch('/:id')
    update(
        @Param('id') id: string,
        @Body() updateUserDto: UpdateUserDto
    ): Promise<UserResponseDto> {
        return this.userService.update(id, updateUserDto)
    }

    @Delete('/:id')
    remove(@Param('id') id: string): Promise<void> {
        return this.userService.remove(id)
    }


}
