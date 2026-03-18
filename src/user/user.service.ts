import {Injectable, NotFoundException} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {User} from "@app/user/entities/user.entity";

@Injectable()
export class UserService {

    constructor(
        @InjectRepository(User)
        private readonly user: Repository<User>
    ) {
    }

    async findOne(username: string): Promise<User> {
        const user = await this.user.findOneBy({username})

        if (!user) throw new NotFoundException('User not found')

        return user
    }

}
