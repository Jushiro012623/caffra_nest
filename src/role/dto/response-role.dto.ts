import { Exclude, Expose } from 'class-transformer';
import { Role } from '@app/role/entities/role.entity';

export class ResponseRoleDto {
  @Expose()
  id: string;

  @Expose()
  name: string;

  @Expose()
  slug: string;

  @Expose({ groups: ['timestamp'] })
  created_at: Date;

  @Expose({ groups: ['timestamp'] })
  updated_at: Date;

  @Exclude()
  deleted_at: Date;

  constructor(partial: Partial<Role>) {
    Object.assign(this, partial);
  }
}
