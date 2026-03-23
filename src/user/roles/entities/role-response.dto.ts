import { Expose } from 'class-transformer';
import { UserResponseDto } from '@app/user/dto/user-response.dto';
import { Role } from '@app/user/roles/entities/role.entity';

export class RoleResponseDto {
  @Expose()
  id: string;

  @Expose()
  name: string;

  @Expose()
  slug: string;

  @Expose({ groups: ['timestamps'] })
  created_at: Date;

  @Expose({ groups: ['timestamps'] })
  updated_at: Date;

  @Expose()
  users?: UserResponseDto[];

  constructor(partial: Partial<Role>) {
    Object.assign(this, partial);
  }
}
