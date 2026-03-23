import {Body, Controller, Delete, Get, Param, Patch, Post} from '@nestjs/common';
import {CategoryService} from "@app/category/category.service";
import {CreateCategoryDto} from "@app/category/dto/create-category.dto";
import {UpdateCategoryDto} from "@app/category/dto/update-category.dto";

@Controller('categories')
export class CategoryController {
    constructor(
        private readonly categoryService: CategoryService
    ) {
    }

    @Get('/')
    findAll(): Promise<any> {
        return this.categoryService.findAll();
    }

    @Get('/:id')
    findOne(@Param('id') id: string): Promise<any> {
        return this.categoryService.findOne(id);
    }

    @Post()
    create(@Body() createCategoryDto: CreateCategoryDto): Promise<any> {
        return this.categoryService.create(createCategoryDto);
    }

    @Patch('/:id')
    update(@Body() updateCategoryDto: UpdateCategoryDto,
           @Param('id') id: string): Promise<any> {
        return this.categoryService.update(id, updateCategoryDto);
    }

    @Delete('/:id')
    delete(@Param('id') id: string): Promise<void> {
        return this.categoryService.delete(id);
    }
}
