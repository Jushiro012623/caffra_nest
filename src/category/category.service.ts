import {Injectable, NotFoundException} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {FindManyOptions, FindOneOptions, FindOptions, FindOptionsWhereProperty, Repository} from "typeorm";
import {Category} from "@app/category/entities/category.entity";
import {CreateCategoryDto} from "@app/category/dto/create-category.dto";
import {UpdateCategoryDto} from "@app/category/dto/update-category.dto";

@Injectable()
export class CategoryService {
    constructor(
        @InjectRepository(Category)
        private readonly categoryRepository: Repository<Category>,
    ) {
    }

    async findAll(): Promise<Category[]> {
        return await this.find({});
    }

    async find(options: FindManyOptions<Category>): Promise<Category[]> {
        return await this.categoryRepository.find(options);
    }

    async findOne(id: string): Promise<Category> {
        const category = await this.findOneBy(id);
        if (!category) throw new NotFoundException('Category not found');
        return category;
    }

    async findOneBy(option: string | FindOneOptions<Category>): Promise<Category> {
        const where = typeof option === 'string' ? {where: {id: option}} : option;
        const category = await this.categoryRepository.findOne(where);
        if (!category) throw new NotFoundException('Category not found');
        return category;
    }

    async create(createCategoryDto: CreateCategoryDto): Promise<Category> {
        const category = this.categoryRepository.create(createCategoryDto);

        return await this.categoryRepository.save(category);
    }

    async update(id: string, updateCategoryDto: UpdateCategoryDto): Promise<Category> {
        const category = await this.findOneBy(id);
        Object.assign(category, updateCategoryDto);
        return await this.categoryRepository.save(category);
    }

    async delete(id: string): Promise<void> {
        const category = await this.findOneBy(id);
        category.deleted_at = new Date();
        await this.categoryRepository.save(category);
    }

}
