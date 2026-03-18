import {IsNotEmpty, IsString, MinLength} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class LoginDto {

    @IsString()
    @IsNotEmpty()
    @MinLength(6)
    @ApiProperty({description: 'Username, email or phone of the user'})
    username: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(5)
    @ApiProperty({description: 'Password of the user'})
    password: string;
}
