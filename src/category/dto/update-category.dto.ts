import {PartialType} from "@nestjs/swagger";
import {CreateCategoryDto} from "@app/category/dto/create-category.dto";
import {IsArray, IsOptional} from "class-validator";

export class UpdateCategoryDto extends PartialType(CreateCategoryDto){

    @IsOptional()
    @IsArray()
    productIDs?: string[];
}