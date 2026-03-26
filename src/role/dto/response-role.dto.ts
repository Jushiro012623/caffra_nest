import { Exclude, Expose } from 'class-transformer';
import { Role } from '@app/role/entities/role.entity';

export class ResponseRoleDto {
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

  @Exclude()
  deleted_at: Date;

  constructor(partial: Partial<Role>) {
    Object.assign(this, partial);
  }
}
