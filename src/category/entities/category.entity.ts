import {
    Column,
    CreateDateColumn,
    DeleteDateColumn, Entity,
    ManyToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";
import {Product} from "@app/product/entities/product.entity";

@Entity('categories')
export class Category {
    @PrimaryGeneratedColumn()
    id: string;

    @Column({type: 'varchar', unique: true, nullable: false})
    name: string;

    @Column({type: 'varchar', nullable: false})
    description: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @DeleteDateColumn()
    deleted_at?: Date;

    @ManyToMany(() => Product, (product) => product.categories, {cascade: true})
    products: Product[];
}