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
import { User } from '@app/user/entities/user.entity';
import { CreateUserDto } from '@app/user/dto/create-user.dto';
import { UpdateUserDto } from '@app/user/dto/update-user.dto';
import type { AuthRequest } from '@app/common/types/request.type';
import { AuthGuard } from '@app/auth/guard/auth.guard';

@Controller('users')
@UseInterceptors(ClassSerializerInterceptor)
@UseGuards(AuthGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/')
  findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Get('/:id')
  @SerializeOptions({ groups: ['timestamps'] })
  findOne(@Param('id') id: string): Promise<User> {
    return this.userService.findOne(id);
  }

  @Post('/')
  @SerializeOptions({ groups: ['timestamps'] })
  create(
    @Body() payload: CreateUserDto,
    @Request() request: AuthRequest,
  ): Promise<User> {
    return this.userService.create(payload, request);
  }

  @Patch('/:id')
  @SerializeOptions({ groups: ['timestamps'] })
  update(
    @Param('id') id: string,
    @Body() payload: UpdateUserDto,
    @Request() request: AuthRequest,
  ): Promise<User> {
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
