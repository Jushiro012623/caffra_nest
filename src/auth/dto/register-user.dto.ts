import {
    IsEmail,
    IsNotEmpty,
    IsString,
    Length,
    MinLength,
} from 'class-validator';
import {ApiProperty} from '@nestjs/swagger';
import {IsConfirmed, IsUnique} from '@app/common/validators';
import {CreateUserDto} from "@app/user/dto/create-user.dto";

export class RegisterUserDto extends CreateUserDto {
}
