import {IsEmail, IsNotEmpty, IsString} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class LoginUserDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({description: 'User username'})
    username: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({description: 'User password'})
    password: string;

}