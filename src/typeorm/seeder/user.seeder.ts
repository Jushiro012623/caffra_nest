import {Injectable} from "@nestjs/common";
import {Seeder} from "nestjs-seeder";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {User} from "@app/user/entities/user.entity";

@Injectable()
export class UserSeeder implements Seeder {

    constructor(
        @InjectRepository(User)
        private readonly user: Repository<User>) {
    }

    async seed(): Promise<void> {
        const now: Date = new Date();

        const firstUser = this.user.create({
            username: 'ivandev',
            password: 'password',
            email: 'ivanallen64@gmail.com',
            mobile_number: '09125279754',
            created_at: now,
            updated_at: now,
        })

        await this.user.save(firstUser);
    }

    async drop(): Promise<void> {
        await this.user.clear();
    }
}