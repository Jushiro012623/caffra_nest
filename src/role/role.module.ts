import { Module } from '@nestjs/common';
import { RoleService } from './role.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoggerModule } from '@app/common/logger/logger.module';
import { Role } from '@app/role/entities/role.entity';
import { RoleController } from './role.controller';
import { JwtModule } from '@app/auth/jwt/jwt.module';

@Module({
  imports: [LoggerModule, JwtModule, TypeOrmModule.forFeature([Role])],
  providers: [RoleService],
  controllers: [RoleController],
  exports: [RoleService],
})
export class RoleModule {}
