import {Injectable, NotFoundException} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {User} from '@app/user/entities/user.entity';
import {FindOptionsWhere, Repository} from 'typeorm';
import {HashService} from '@app/crypto/hash.service';
import {ResponseUserDto} from "@app/user/dto/response-user.dto";
import {CreateUserDto} from "@app/user/dto/create-user.dto";
import {UpdateUserDto} from "@app/user/dto/update-user.dto";

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        private readonly hashService: HashService,
    ) {
    }

    async findAll(): Promise<User[]> {
        const users: User[] = await this.userRepository.find();
        return users.map((user: User): ResponseUserDto => new ResponseUserDto(user));
    }

    async findOne(id: string): Promise<User> {
        const user: User | null = await this.findOneBy({id});
        if (!user) {
            throw new NotFoundException();
        }
        return new ResponseUserDto(user);
    }

    async create(createUserDto: CreateUserDto): Promise<User> {
        const user: User = this.userRepository.create(createUserDto);

        const hashPassword: string = await this.hashService.hash(user.password);
        Object.assign(user, {password: hashPassword});

        const createUser: User = await this.save(user);
        return new ResponseUserDto(createUser)
    }

    async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
        const user: User = await this.findOne(id);

        Object.assign(user, updateUserDto);

        if (updateUserDto.password) {
            const hashPassword = await this.hashService.hash(updateUserDto.password);
            Object.assign(user, {password: hashPassword})
        }
        const updatedUser: User = await this.save(user);

        return new ResponseUserDto(updatedUser)
    }

    async findOneBy(
        where: FindOptionsWhere<User> | FindOptionsWhere<User>[],
    ): Promise<User | null> {
        return await this.userRepository.findOneBy(where);
    }

    async save(user: User): Promise<User> {
        return this.userRepository.save(user);
    }
}
