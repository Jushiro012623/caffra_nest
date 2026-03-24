import {Exclude, Expose} from "class-transformer";
import {User} from "@app/user/entities/user.entity";
import {ApiProperty} from "@nestjs/swagger";

export class ResponseUserDto {

    @Expose()
    @ApiProperty({description: 'User ID'})
    id: string;

    @Expose()
    @ApiProperty({description: 'User email'})
    email: string;

    @Expose()
    @ApiProperty({description: 'User username'})
    username: string;

    @Exclude()
    @ApiProperty({description: 'User password'})
    password: string;

    @Expose()
    @ApiProperty({description: 'User mobile number'})
    mobile_number: string;

    constructor(partial: Partial<User>) {
        Object.assign(this, partial);
    }
}