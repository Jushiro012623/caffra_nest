import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '@app/user/entities/user.entity';
import {
  FindOneOptions,
  FindOptions,
  FindOptionsWhere,
  In,
  Repository,
} from 'typeorm';
import { HashService } from '@app/crypto/hash.service';
import { ResponseUserDto } from '@app/user/dto/response-user.dto';
import { CreateUserDto } from '@app/user/dto/create-user.dto';
import { UpdateUserDto } from '@app/user/dto/update-user.dto';
import { LoggerService } from '@app/common/logger/logger.service';
import type { AuthRequest } from '@app/common/types/auth.types';
import { Role } from '@app/role/entities/role.entity';
import { RoleService } from '@app/role/role.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly hashService: HashService,
    private readonly roleService: RoleService,
    private logger: LoggerService,
  ) {
    this.logger.setContext(UserService.name);
  }

  async findAll(): Promise<User[]> {
    const users: User[] = await this.userRepository.find({
      relations: ['roles'],
    });
    return users.map(
      (user: User): ResponseUserDto => new ResponseUserDto(user),
    );
  }

  async findOne(id: string): Promise<User> {
    const user: User | null = await this.findOneBy({ id });
    if (!user) {
      throw new NotFoundException();
    }
    return new ResponseUserDto(user);
  }

  async create(payload: CreateUserDto, request?: AuthRequest): Promise<User> {
    const user: User = this.userRepository.create(payload);

    user.password = await this.hashService.hash(user.password);
    user.roles = await this.roleService.resolveRoles(payload.roleIds);

    const createUser: User = await this.userRepository.save(user);
    this.logger.log('USER_CREATED_SUCCESS', {
      id: createUser.id,
      actorId: request?.user?.sub || createUser.id,
    });
    return new ResponseUserDto(createUser);
  }

  async update(
    id: string,
    payload: UpdateUserDto,
    request: AuthRequest,
  ): Promise<User> {
    const user: User = await this.findOne(id);

    if (payload.password) {
      payload.password = await this.hashService.hash(payload.password);
    }

    Object.assign(user, payload);

    const updatedUser: User = await this.userRepository.save(user);
    this.logger.log('USER_UPDATED_SUCCESS', {
      id,
      actorId: request.user.sub,
    });
    return new ResponseUserDto(updatedUser);
  }

  async delete(id: string, request: AuthRequest): Promise<void> {
    const user: User = await this.findOne(id);
    user.deleted_at = new Date();
    await this.userRepository.save(user);
    this.logger.log('USER_DELETED_SUCCESS', {
      id,
      actorId: request.user.sub,
    });
  }

  async findOneBy(
    where: FindOptionsWhere<User> | FindOptionsWhere<User>[],
    options?: Omit<FindOneOptions<User>, 'where'>,
  ): Promise<User | null> {
    return await this.userRepository.findOne({ where, ...options });
  }

  async updatePassword(user: User, password: string): Promise<void> {
    user.password = await this.hashService.hash(password);
    await this.userRepository.save(user);
  }
}
