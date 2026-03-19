import {
    BeforeInsert, BeforeUpdate,
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity, ManyToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";
import {Password} from "@app/user/helper/password.helper";
import {User} from "@app/user/entities/user.entity";

@Entity({name: 'roles'})
export class Role {
    @PrimaryGeneratedColumn()
    id: string;

    @Column({nullable: false, unique: true})
    name: string;

    @Column({nullable: false, unique: true})
    slug: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @ManyToMany(() => User, (user) => user.roles)
    users: User[];
}