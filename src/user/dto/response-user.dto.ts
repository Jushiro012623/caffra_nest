import {Exclude, Expose} from 'class-transformer';
import {User} from '@app/user/entities/user.entity';
import {ApiProperty} from '@nestjs/swagger';

export class ResponseUserDto {
    @Expose()
    id: string;

    @Expose()
    email: string;

    @Expose()
    username: string;

    @Exclude()
    password: string;

    @Expose()
    mobile_number: string;

    @Expose({groups: ['timestamps']})
    created_at: Date;

    @Expose({groups: ['timestamps']})
    updated_at: Date;

    @Exclude()
    deleted_at: Date;

    constructor(partial: Partial<User>) {
        Object.assign(this, partial);
    }

}


