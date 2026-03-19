import {ArrayNotEmpty, IsArray, IsEmail, IsNotEmpty, IsString, MinLength} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";
import {IsConfirmed, IsUnique} from "@app/common";
import {IsExists} from "@app/common/validators/is-exists.validator";
import {Role} from "@app/user/roles/entities/role.entity";

export class CreateUserDto {

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
    @IsConfirmed('confirm_password')
    password: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({description: 'Confirm password of the user'})
    @IsConfirmed('password')
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

    @ArrayNotEmpty()
    @ApiProperty({description: 'Roles of the user', type: [Role]})
    @IsArray()
    roles: Role[];

}
