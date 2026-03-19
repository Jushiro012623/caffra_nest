import {Exclude, Expose} from "class-transformer";
import {User} from "@app/user/entities/user.entity";
import {Role} from "@app/user/roles/entities/role.entity";
import {RoleResponseDto} from "@app/user/roles/entities/role-response.dto";

export class UserResponseDto {

    @Expose()
    id: string;

    @Expose()
    username: string;

    @Expose()
    email: string;

    @Expose()
    mobile_number: string;

    @Expose()
    roles?: RoleResponseDto[];

    @Expose({groups: ['timestamps']})
    created_at: Date;

    @Expose({groups: ['timestamps']})
    updated_at: Date;

    @Exclude()
    deleted_at?: Date;

    @Exclude()
    password?: string;

    constructor(partial: Partial<User>) {
        Object.assign(this, partial);

    }
}