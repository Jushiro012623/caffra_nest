import {Exclude, Expose} from "class-transformer";
import {Product} from "@app/product/entities/product.entity";
import {CategoryResponseDto} from "@app/category/dto/category-response.dto";

export class ProductResponseDto {

    @Expose()
    id: string;

    @Expose()
    name: string;

    @Expose()
    description: string;

    @Expose()
    price: number;

    @Expose({groups: ['timestamps']})
    created_at: Date;

    @Expose({groups: ['timestamps']})
    updated_at: Date;

    @Exclude()
    deleted_at?: Date;

    @Expose()
    categories?: CategoryResponseDto[];

    constructor(partial: Partial<Product>) {
        Object.assign(this, partial);

        if (partial.categories) {
            this.categories = partial.categories.map((category) => new CategoryResponseDto(category));
        }
    }
}
