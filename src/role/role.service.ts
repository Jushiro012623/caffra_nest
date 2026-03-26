import {
    BadRequestException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Role} from '@app/role/entities/role.entity';
import {FindOptionsWhere, In, Repository} from 'typeorm';
import {CreateRoleDto} from '@app/role/dto/create-role.dto';
import {LoggerService} from '@app/common/logger/logger.service';
import {UpdateRoleDto} from '@app/role/dto/update-role.dto';
import type {AuthRequest} from '@app/common/types/request.type';
import {FindManyOptions} from 'typeorm/find-options/FindManyOptions';

@Injectable()
export class RoleService {
    constructor(
        @InjectRepository(Role)
        private readonly roleRepository: Repository<Role>,
        private logger: LoggerService,
    ) {
        this.logger.setContext(RoleService.name);
    }

    async findAll(): Promise<Role[]> {
        return this.find();
    }

    async findOne(id: string): Promise<Role> {
        const role: Role | null = await this.findOneBy({id});
        if (!role) throw new NotFoundException('Role Not found');
        return role;
    }

    async create(payload: CreateRoleDto, request: AuthRequest): Promise<Role> {
        const role: Role = this.roleRepository.create(payload);
        const createdRole: Role = await this.roleRepository.save(role);
        this.logger.log('ROLE_CREATED_SUCCESS', {
            id: createdRole.id,
            role: createdRole.name,
            actorId: request.user.id as string,
        });
        return createdRole;
    }

    async update(
        id: string,
        payload: UpdateRoleDto,
        request: AuthRequest,
    ): Promise<Role> {
        const role: Role | null = await this.findOneBy({id});
        if (!role) throw new NotFoundException('Role Not found');
        Object.assign(role, payload);
        const updatedRole: Role = await this.roleRepository.save(role);
        this.logger.log('ROLE_UPDATED_SUCCESS', {
            id,
            role: updatedRole.name,
            actorId: request.user.id as string,
        });
        return updatedRole;
    }

    async delete(id: string, request: AuthRequest): Promise<void> {
        const role: Role | null = await this.findOneBy({id});
        if (!role) throw new NotFoundException('Role Not found');
        await this.roleRepository.remove(role);
        this.logger.log('ROLE_DELETED_SUCCESS', {
            id,
            actorId: request.user.id as string,
        });
    }

    async findOneBy(
        where: FindOptionsWhere<Role> | FindOptionsWhere<Role>[],
    ): Promise<Role | null> {
        return await this.roleRepository.findOneBy(where);
    }

    async find(options?: FindManyOptions<Role>): Promise<Role[]> {
        return await this.roleRepository.find(options);
    }

    async resolveRoles(roleIds: string[]): Promise<Role[]> {
        const userRoles: Role[] = await this.roleRepository.find({
            where: {id: In(roleIds)},
        });

        const foundIds: Set<string> = new Set(
            userRoles.map((role) => String(role.id)),
        );
        const missingIds: string[] = roleIds.filter(
            (id: string) => !foundIds.has(id),
        );

        if (missingIds.length === 0) return userRoles;

        this.logger.warn('ROLES_REQUEST_MODIFIED_ROLES_NOT_FOUND', {missingIds});
        throw new BadRequestException('Roles not found');
    }
}
