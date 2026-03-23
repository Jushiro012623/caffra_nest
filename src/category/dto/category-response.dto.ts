import {Exclude, Expose} from "class-transformer";
import {Category} from "@app/category/entities/category.entity";
import {RoleResponseDto} from "@app/user/roles/entities/role-response.dto";
import {ProductResponseDto} from "@app/product/dto/product-response.dto";

export class CategoryResponseDto {

    @Expose()
    id: string;

    @Expose()
    name: string;

    @Expose()
    description: string;

    @Expose({groups: ['timestamps']})
    created_at: Date;

    @Expose({groups: ['timestamps']})
    updated_at: Date;

    @Exclude()
    deleted_at?: Date;

    @Expose()
    products?: ProductResponseDto[];

    constructor(partial: Partial<Category>) {
        Object.assign(this, partial);

        if (partial.products) {
            this.products = partial.products.map((product) => new ProductResponseDto(product));
        }
    }
}