import {Module} from '@nestjs/common';
import {RolesService} from './roles.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Role} from "@app/user/roles/entities/role.entity";
import {UserModule} from "@app/user/user.module";

@Module({
    imports: [
        TypeOrmModule.forFeature([Role])
    ],
    providers: [RolesService],
    exports: [RolesService]
})
export class RolesModule {
}
