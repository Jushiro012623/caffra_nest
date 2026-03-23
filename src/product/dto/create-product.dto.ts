import {ArrayNotEmpty, IsArray, IsNotEmpty, IsNumber, IsOptional, IsString} from "class-validator";
import {IsUnique} from "@app/common";
import {Category} from "@app/category/entities/category.entity";

export class CreateProductDto {

    @IsString()
    @IsNotEmpty()
    @IsUnique({tableName: 'products', column: 'name'})
    name: string;

    @IsString()
    @IsNotEmpty()
    description: string;

    @IsNotEmpty()
    @IsNumber()
    price: number;

    @ArrayNotEmpty()
    @IsArray()
    categories: Category[];
}

