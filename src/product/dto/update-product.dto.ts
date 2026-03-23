import {IsNotEmpty, IsNumber, IsString} from "class-validator";
import {IsUnique} from "@app/common";
import {PartialType} from "@nestjs/swagger";
import {CreateProductDto} from "@app/product/dto/create-product.dto";

export class UpdateProductDto extends PartialType(CreateProductDto) {}

