import {IsNotEmpty, IsString, MinLength} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class LoginDto {

    @IsString()
    @IsNotEmpty()
    @ApiProperty({description: 'Username, email or phone of the user'})
    username: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({description: 'Password of the user'})
    password: string;
}
