import {Injectable, NotFoundException} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Product} from "@app/product/entities/product.entity";
import {FindOneOptions, In, Repository} from "typeorm";
import {User} from "@app/user/entities/user.entity";
import {CreateProductDto} from "@app/product/dto/create-product.dto";
import {UpdateProductDto} from "@app/product/dto/update-product.dto";
import {ProductResponseDto} from "@app/product/dto/product-response.dto";
import {plainToInstance} from "class-transformer";
import {CategoryService} from "@app/category/category.service";
import {Role} from "@app/user/roles/entities/role.entity";
import {Category} from "@app/category/entities/category.entity";

@Injectable()
export class ProductService {
    constructor(
        @InjectRepository(Product)
        private readonly productRepository: Repository<Product>,
        private readonly categoryService: CategoryService,
    ) {
    }

    async findAll(): Promise<ProductResponseDto[]> {
        const products = await this.productRepository.find({relations: ['categories']});
        return products.map((product) => new ProductResponseDto(product));
    }

    async findOne(id: string): Promise<ProductResponseDto> {
        const product = await this.findOneBy({where: {id}, relations: ['categories']});
        return new ProductResponseDto(product);
    }

    async findOneBy(options: FindOneOptions<Product> | string): Promise<Product> {
        options = typeof options === 'string' ? {where: {id: options}} : options;
        const product = await this.productRepository.findOne(options);
        if (!product) throw new NotFoundException('Product not found');
        return product;
    }

    async create(productDto: CreateProductDto): Promise<ProductResponseDto> {
        const categories = await this.categoryService.find({where: {id: In(productDto.categories)}});
        Object.assign(productDto, {categories});
        const product = this.productRepository.create(productDto);

        return new ProductResponseDto(await this.save(product));
    }

    async save(product: Product): Promise<Product> {
        return this.productRepository.save(product);
    }

    async update(id: string, productDto: UpdateProductDto): Promise<ProductResponseDto> {
        const product = await this.findOneBy(id);
        Object.assign(product, productDto);
        return new ProductResponseDto(await this.save(product));
    }

    async delete(id: string): Promise<void> {
        const product = await this.findOneBy(id);
        product.deleted_at = new Date();
        await this.save(product);
    }

}
