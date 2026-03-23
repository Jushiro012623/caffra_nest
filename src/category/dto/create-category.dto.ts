import {IsNotEmpty, IsOptional, IsString, ValidateNested} from "class-validator";
import {IsUnique} from "@app/common";
import {CreateProductDto} from "@app/product/dto/create-product.dto";
import {Type} from "class-transformer";

export class CreateCategoryDto {

    @IsString()
    @IsUnique({tableName: 'categories', column: 'name'})
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    description: string;

    @ValidateNested({each: true})
    @IsOptional()
    @Type(()=> CreateProductDto)
    products?: CreateProductDto[];

}