import {Module} from '@nestjs/common';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Product} from "@app/product/entities/product.entity";
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { CategoryModule } from '@app/category/category.module';
import {CategoryService} from "@app/category/category.service";
import {Category} from "@app/category/entities/category.entity";

@Module({
    imports: [TypeOrmModule.forFeature([Product, Category]), CategoryModule],
    controllers: [ProductController],
    providers: [ProductService, CategoryService],
})
export class ProductModule {
}
