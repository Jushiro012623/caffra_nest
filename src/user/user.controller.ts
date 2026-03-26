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
import { UserService } from '@app/user/user.service';
import { CreateUserDto } from '@app/user/dto/create-user.dto';
import { UpdateUserDto } from '@app/user/dto/update-user.dto';
import type { AuthRequest } from '@app/common/types/request.type';
import { AuthGuard } from '@app/auth/guard/auth.guard';
import { Roles } from '@app/role/decorators/roles.decorator';
import { RoleEnum } from '@app/role/enums/role.enum';
import { RolesGuard } from '@app/role/guard/role.guard';
import { ResponseUserDto } from '@app/user/dto/response-user.dto';

@Controller('users')
@UseInterceptors(ClassSerializerInterceptor)
@UseGuards(AuthGuard, RolesGuard)
@Roles(RoleEnum.Admin)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/')
  findAll(): Promise<ResponseUserDto[]> {
    return this.userService.findAll();
  }

  @Get('/:id')
  @SerializeOptions({ groups: ['timestamps'] })
  findOne(@Param('id') id: string): Promise<ResponseUserDto> {
    return this.userService.findOne(id);
  }

  @Post('/')
  @SerializeOptions({ groups: ['timestamps'], excludeExtraneousValues: true })
  create(
    @Body() payload: CreateUserDto,
    @Request() request: AuthRequest,
  ): Promise<ResponseUserDto> {
    return this.userService.create(payload, request);
  }

  @Patch('/:id')
  @SerializeOptions({ groups: ['timestamps'], excludeExtraneousValues: true })
  update(
    @Param('id') id: string,
    @Body() payload: UpdateUserDto,
    @Request() request: AuthRequest,
  ): Promise<ResponseUserDto> {
    return this.userService.update(id, payload, request);
  }

  @Delete('/:id')
  delete(
    @Param('id') id: string,
    @Request() request: AuthRequest,
  ): Promise<void> {
    return this.userService.delete(id, request);
  }
}
