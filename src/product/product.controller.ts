import {
    Body,
    ClassSerializerInterceptor,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post, SerializeOptions,
    UseInterceptors
} from '@nestjs/common';
import {ProductService} from "@app/product/product.service";
import {CreateProductDto} from "@app/product/dto/create-product.dto";
import {UpdateProductDto} from "@app/product/dto/update-product.dto";
import {ProductResponseDto} from "@app/product/dto/product-response.dto";

@Controller('products')
@UseInterceptors(ClassSerializerInterceptor)
export class ProductController {

    constructor(private readonly productService: ProductService) {
    }

    @Get('/')
    findAll(): Promise<ProductResponseDto[]> {
        return this.productService.findAll();
    }

    @Get('/:id')
    @SerializeOptions({ groups: ['timestamps'] })
    findOne(@Param('id') id: string): Promise<ProductResponseDto> {
        return this.productService.findOne(id);
    }

    @Post('/')
    @SerializeOptions({ groups: ['timestamps'] })
    create(@Body() createProductDto: CreateProductDto): Promise<ProductResponseDto> {
        return this.productService.create(createProductDto);
    }

    @Patch('/:id')
    @SerializeOptions({ groups: ['timestamps'] })
    update(
        @Param('id') id: string,
        @Body() updateProductDTO: UpdateProductDto): Promise<ProductResponseDto> {
        return this.productService.update(id, updateProductDTO);
    }

    @Delete('/:id')
    delete(@Param('id') id: string): Promise<void> {
        return this.productService.delete(id);
    }

}
