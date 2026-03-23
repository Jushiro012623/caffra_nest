import { seeder } from 'nestjs-seeder';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '@app/user/entities/user.entity';
import { UserSeeder } from '@app/typeorm/seeder/user.seeder';
import { typeormConfig } from '@app/config';
import { Role } from '@app/user/roles/entities/role.entity';

seeder({
  imports: [
    TypeOrmModule.forRoot(typeormConfig()),
    TypeOrmModule.forFeature([User, Role]),
  ],
}).run([UserSeeder]);
