import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '@app/user/entities/user.entity';
import { FindOptionsWhere, Repository } from 'typeorm';
import { HashService } from '@app/crypto/hash.service';
import { ResponseUserDto } from '@app/user/dto/response-user.dto';
import { CreateUserDto } from '@app/user/dto/create-user.dto';
import { UpdateUserDto } from '@app/user/dto/update-user.dto';
import { LoggerService } from '@app/common/logger/logger.service';
import type { AuthRequest } from '@app/common/types/auth.types';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly hashService: HashService,
    private logger: LoggerService,
  ) {
    this.logger.setContext(UserService.name);
  }

  async findAll(): Promise<User[]> {
    const users: User[] = await this.userRepository.find();
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

  async create(payload: CreateUserDto, request: AuthRequest): Promise<User> {
    const user: User = this.userRepository.create(payload);

    const hashPassword: string = await this.hashService.hash(user.password);
    Object.assign(user, { password: hashPassword });

    const createUser: User = await this.save(user);
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

    const updatedUser: User = await this.save(user);
    this.logger.log('USER_UPDATED_SUCCESS', {
      id: updatedUser.id,
      actorId: request?.user?.sub,
    });
    return new ResponseUserDto(updatedUser);
  }

  async delete(id: string, request: AuthRequest): Promise<void> {
    const user: User = await this.findOne(id);
    user.deleted_at = new Date();
    await this.save(user);
    this.logger.log('USER_DELETED_SUCCESS', {
      id: user.id,
      actorId: request?.user?.sub,
    });
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
