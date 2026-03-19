import {Injectable, NotFoundException} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Role} from "@app/user/roles/entities/role.entity";
import {FindOptionsWhere, In, Repository} from "typeorm";

@Injectable()
export class RolesService {
    constructor(
        @InjectRepository(Role)
        private readonly roleRepository: Repository<Role>
    ) {
    }

    async findWhere(where: FindOptionsWhere<Role> | FindOptionsWhere<Role>[]): Promise<Role[]> {
        return this.roleRepository.findBy(where)
    }

    async resolveRoles(roleIds: Role[]): Promise<Role[]> {
        const roles = await this.findWhere({id: In<Role>(roleIds)})
        if (roles.length !== roleIds.length) {
            throw new NotFoundException('Invalid roles')
        }
        return roles
    }
}
