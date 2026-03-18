import {IsEmail, IsNotEmpty, IsString, Matches, MinLength} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";
import {IsUnique} from "@app/common";

export class RegisterDto {

    @IsString()
    @IsNotEmpty()
    @MinLength(6)
    @IsUnique({tableName: 'users', column: 'username'})
    @ApiProperty({description: 'Username of the user'})
    username: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(5)
    @ApiProperty({description: 'Password of the user'})
    password: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({description: 'Confirm password of the user'})
    confirm_password: string;

    @IsString()
    @IsNotEmpty()
    @IsEmail()
    @ApiProperty({description: 'Email of the user'})
    @IsUnique({tableName: 'users', column: 'email'})
    email: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({description: 'Mobile number of the user'})
    mobile_number: string;

}
