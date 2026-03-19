import {Expose} from "class-transformer";
import {UserResponseDto} from "@app/user/dto/user-response.dto";

export class RoleResponseDto {
    @Expose()
    id: string;

    @Expose()
    name: string;

    @Expose()
    slug: string;

    @Expose({groups: ['timestamps']})
    created_at: Date;

    @Expose({groups: ['timestamps']})
    updated_at: Date;

    @Expose()
    users?: UserResponseDto[];

}