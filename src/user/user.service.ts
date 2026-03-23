import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, Repository } from 'typeorm';
import { User } from '@app/user/entities/user.entity';
import { CreateUserDto } from '@app/user/dto/create-user.dto';
import { RolesService } from '@app/user/roles/roles.service';
import { UserResponseDto } from '@app/user/dto/user-response.dto';
import { UpdateUserDto } from '@app/user/dto/update-user.dto';
import { Hasher } from '@app/common/utils/hasher.util';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly roleService: RolesService,
  ) {}

  async findAll(): Promise<UserResponseDto[]> {
    const users = await this.userRepository.find({ relations: ['roles'] });
    return users.map((user) => new UserResponseDto(user));
  }

  async findById(id: string): Promise<UserResponseDto> {
    const user = await this.findOneBy({ where: { id }, relations: ['roles'] });
    if (!user) throw new NotFoundException('User not found');
    return new UserResponseDto(user);
  }

  async create(createUserDto: CreateUserDto): Promise<any> {
    const { confirm_password, ...dto } = createUserDto;

    Object.assign(dto, {
      roles: await this.roleService.resolveRoles(dto.roles),
    });

    const createUser = this.userRepository.create(dto);

    return await this.save(createUser);
  }

  async update(
    id: string,
    updateUserDto: UpdateUserDto,
  ): Promise<UserResponseDto> {
    const user = await this.findOneBy({ where: { id } });

    if (!user) throw new NotFoundException('User not found');

    const { confirm_password, ...dto } = updateUserDto;
    if (dto.roles) {
      Object.assign(dto, {
        roles: await this.roleService.resolveRoles(dto.roles),
      });
    }

    if (dto.password) {
      Object.assign(dto, { password: await Hasher.hash(dto.password) });
    }
    Object.assign(user, dto);
    const updatedUser = await this.save(user);

    return new UserResponseDto(updatedUser);
  }

  async remove(id: string): Promise<void> {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    user.deleted_at = new Date();
    await this.userRepository.save(user);
  }

  async findOneBy(options: FindOneOptions<User>): Promise<User | null> {
    return this.userRepository.findOne(options);
  }

  async save(user: User): Promise<User> {
    return this.userRepository.save(user);
  }
}
