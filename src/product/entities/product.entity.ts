import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity, JoinTable,
    ManyToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";
import {Category} from "@app/category/entities/category.entity";

@Entity('products')
export class Product {
    @PrimaryGeneratedColumn()
    id: string;

    @Column({nullable: false, unique: true, type: 'varchar'})
    name: string;

    @Column({nullable: false, type: 'varchar'})
    description: string;

    @Column({nullable: false, type: 'float'})
    price: number;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @DeleteDateColumn()
    deleted_at?: Date;

    @ManyToMany(() => Category, (category) => category.products)
    @JoinTable({
        name: 'product_categories',
        joinColumn: {name: 'product_id', referencedColumnName: 'id'},
        inverseJoinColumn: {name: 'category_id', referencedColumnName: 'id'},
    })
    categories: Category[];
}