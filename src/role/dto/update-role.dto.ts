import { PartialType } from '@nestjs/swagger';
import { CreateRoleDto } from '@app/role/dto/create-role.dto';

export class UpdateRoleDto extends PartialType(CreateRoleDto) {}
