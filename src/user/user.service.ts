import {Injectable} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {User} from "@app/user/entities/user.entity";
import {FindOptionsWhere, Repository} from "typeorm";
import {RegisterUserDto} from "@app/auth/dto/register-user.dto";
import {HashService} from "@app/crypto/hash.service";

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        private readonly hashService: HashService
    ) {
    }

    async create(value: RegisterUserDto): Promise<User> {
        Object.assign(value, {password: await this.hashService.hash(value.password)})
        const createdUser = this.userRepository.create(value)
        return this.userRepository.save(createdUser)
    }

    async findOneBy(where: FindOptionsWhere<User> | FindOptionsWhere<User>[]): Promise<User | null> {
        return await this.userRepository.findOneBy(where)
    }

    async save(user: User): Promise<User> {
        return this.userRepository.save(user)
    }

}
