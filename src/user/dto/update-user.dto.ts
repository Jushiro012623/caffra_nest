import { PartialType } from '@nestjs/swagger';
import { CreateUserDto } from '@app/user/dto/create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {}
