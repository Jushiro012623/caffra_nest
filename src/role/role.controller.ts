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
  SerializeOptions,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { RoleService } from '@app/role/role.service';
import { CreateRoleDto } from '@app/role/dto/create-role.dto';
import type { AuthRequest } from '@app/common/types/request.type';
import { AuthGuard } from '@app/auth/guard/auth.guard';
import { UpdateRoleDto } from '@app/role/dto/update-role.dto';
import { Roles } from '@app/role/decorators/roles.decorator';
import { RoleEnum } from '@app/role/enums/role.enum';
import { RolesGuard } from '@app/role/guard/role.guard';
import { ResponseRoleDto } from '@app/role/dto/response-role.dto';

@Controller('roles')
@UseInterceptors(ClassSerializerInterceptor)
@UseGuards(AuthGuard, RolesGuard)
@Roles(RoleEnum.Admin)
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Get('/')
  findAll(): Promise<ResponseRoleDto[]> {
    return this.roleService.findAll();
  }

  @Get('/:id')
  @SerializeOptions({ groups: ['timestamps'], excludeExtraneousValues: true })
  findOne(@Param('id') id: string): Promise<ResponseRoleDto> {
    return this.roleService.findOne(id);
  }

  @Post('/')
  @SerializeOptions({ groups: ['timestamps'], excludeExtraneousValues: true })
  create(
    @Body() payload: CreateRoleDto,
    @Request() request: AuthRequest,
  ): Promise<ResponseRoleDto> {
    return this.roleService.create(payload, request);
  }

  @Patch('/:id')
  @SerializeOptions({ groups: ['timestamps'], excludeExtraneousValues: true })
  update(
    @Param('id') id: string,
    @Body() payload: UpdateRoleDto,
    @Request() request: AuthRequest,
  ): Promise<ResponseRoleDto> {
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
