import {Injectable} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Role} from "@app/user/roles/entities/role.entity";
import {FindOptionsWhere, Repository} from "typeorm";

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
}
