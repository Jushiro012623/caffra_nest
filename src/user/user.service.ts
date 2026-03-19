import {Injectable, NotFoundException} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {FindOneOptions, In, Repository} from "typeorm";
import {User} from "@app/user/entities/user.entity";
import {CreateUserDto} from "@app/user/dto/create-user.dto";
import {Password} from "@app/user/helper/password.helper";
import {RolesService} from "@app/user/roles/roles.service";
import {UserResponseDto} from "@app/user/dto/user-response.dto";
import {UpdateUserDto} from "@app/user/dto/update-user.dto";

@Injectable()
export class UserService {

    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        private readonly roleService: RolesService
    ) {
    }

    async findAll(): Promise<UserResponseDto[]> {
        const users = await this.userRepository.find({relations: ['roles']})
        return users.map(user => new UserResponseDto(user))
    }

    async findById(id: string): Promise<UserResponseDto> {
        const user = await this.findOneBy({where: {id}, relations: ['roles']})
        if (!user) throw new NotFoundException('User not found')
        return new UserResponseDto(user)
    }


    async create(createUserDto: CreateUserDto): Promise<any> {
        const {confirm_password, ...dto} = createUserDto

        Object.assign(dto, {roles: await this.roleService.findWhere({id: In(dto.roles)})})

        const createUser = this.userRepository.create(dto)

        return await this.save(createUser)
    }

    async update(id: string, updateUserDto: UpdateUserDto): Promise<UserResponseDto> {
        const user = await this.findOneBy({where: {id}})
        if (!user) throw new NotFoundException('User not found')

        if (updateUserDto.roles) {
            Object.assign(updateUserDto, {roles: await this.roleService.findWhere({id: In(updateUserDto.roles)})})
        }

        if (updateUserDto.password) {
            Object.assign(updateUserDto, {password: await Password.hash(updateUserDto.password)})
        }

        const updatedUser = Object.assign(user, updateUserDto)
        await this.save(updatedUser)

        return new UserResponseDto(updatedUser)

    }

    async remove(id: string): Promise<void> {
        const user = await this.findOneBy({where: {id}})

        if (!user) throw new NotFoundException('User not found')

        await this.userRepository.softDelete(id)

    }

    async findOneBy(options: FindOneOptions<User>): Promise<User | null> {
        return this.userRepository.findOne(options);
    }

    async save(user: User): Promise<User> {
        return this.userRepository.save(user)
    }

}
