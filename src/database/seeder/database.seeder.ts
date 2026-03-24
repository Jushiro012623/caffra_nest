import {seeder} from 'nestjs-seeder';
import {TypeOrmModule} from '@nestjs/typeorm';
import {UserSeeder} from '@app/database/seeder/user.seeder';
import {typeormConfig} from '@app/config';
import {User} from "@app/user/entities/user.entity";

seeder({
    imports: [
        TypeOrmModule.forRoot(typeormConfig()),
    ],
}).run([UserSeeder]);
