import {Injectable} from "@nestjs/common";
import {Seeder} from "nestjs-seeder";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {User} from "@app/user/entities/user.entity";
import {Role} from "@app/user/roles/entities/role.entity";

@Injectable()
export class UserSeeder implements Seeder {

    constructor(
        @InjectRepository(User)
        private readonly user: Repository<User>,
        @InjectRepository(Role)
        private readonly role: Repository<Role>) {
    }

    async seed(): Promise<void> {
        const now: Date = new Date();

        const roleData = [
            {
                name: 'Admin',
                slug: 'admin',
                created_at: now,
                updated_at: now,
            },
            {
                name: 'Cashier',
                slug: 'cashier',
                created_at: now,
                updated_at: now,
            }
        ]

        const roles = await this.role.save(roleData)

        const firstUser = this.user.create({
            username: 'ivandev',
            password: 'password',
            email: 'ivanallen64@gmail.com',
            mobile_number: '09125279754',
            created_at: now,
            updated_at: now,
            roles: roles
        })


        await this.user.save(firstUser);
    }

    async drop(): Promise<void> {
        await this.user.deleteAll()
        await this.role.deleteAll();
    }
}