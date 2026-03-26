import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Request,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { Role } from '@app/role/entities/role.entity';
import { RoleService } from '@app/role/role.service';
import { CreateRoleDto } from '@app/role/dto/create-role.dto';
import type { AuthRequest } from '@app/common/types/auth.types';
import { AuthGuard } from '@app/auth/guard/auth.guard';
import { UpdateRoleDto } from '@app/role/dto/update-role.dto';

@Controller('roles')
@UseInterceptors(ClassSerializerInterceptor)
@UseGuards(AuthGuard)
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Get('/')
  findAll(): Promise<Role[]> {
    return this.roleService.findAll();
  }

  @Get('/:id')
  findOne(@Param('id') id: string): Promise<Role> {
    return this.roleService.findOne(id);
  }

  @Post('/')
  create(
    @Body() payload: CreateRoleDto,
    @Request() request: AuthRequest,
  ): Promise<Role> {
    return this.roleService.create(payload, request);
  }

  @Patch('/:id')
  update(
    @Param('id') id: string,
    @Body() payload: UpdateRoleDto,
    @Request() request: AuthRequest,
  ): Promise<Role> {
    return this.roleService.update(id, payload, request);
  }

  @Delete('/:id')
  delete(
    @Param('id') id: string,
    @Request() request: AuthRequest,
  ): Promise<void> {
    return this.roleService.delete(id, request);
  }
}
