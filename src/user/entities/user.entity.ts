import {
    AfterInsert,
    BeforeInsert, BeforeUpdate,
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity, JoinTable, ManyToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";
import {Password} from "@app/user/helper/password.helper";
import {Role} from "@app/user/roles/entities/role.entity";

@Entity({name: 'users'})
export class User {
    @PrimaryGeneratedColumn()
    id: string;

    @Column({nullable: false, unique: true})
    username: string;

    @Column({nullable: false})
    password: string;

    @Column({nullable: false, unique: true})
    email: string;

    @Column({nullable: false})
    mobile_number: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @DeleteDateColumn()
    deleted_at?: Date;

    @BeforeInsert()
    async hashPassword(): Promise<void> {
        if (this.password) this.password = await Password.hash(this.password);
    }

    @ManyToMany(() => Role, (role) => role.users)
    @JoinTable({
        name: 'user_roles',
        joinColumn: {name: 'user_id', referencedColumnName: 'id'},
        inverseJoinColumn: {name: 'role_id', referencedColumnName: 'id'}
    })
    roles: Role[];

    async userHasRole(role: string): Promise<boolean> {
        return (await this.roles).some((r) => r.slug === role);
    }
}