import { Exclude, Expose } from 'class-transformer';
import { User } from '@app/user/entities/user.entity';
import { Role } from '@app/role/entities/role.entity';
import { ResponseRoleDto } from '@app/role/dto/response-role.dto';

export class ResponseUserDto {
  @Expose()
  id: string;

  @Expose()
  email: string;

  @Expose()
  username: string;

  @Exclude()
  password: string;

  @Expose()
  mobile_number: string;

  @Expose({ groups: ['timestamps'] })
  created_at: Date;

  @Expose({ groups: ['timestamps'] })
  updated_at: Date;

  @Exclude()
  deleted_at: Date;

  @Expose()
  roles: Role[];

  constructor(partial: Partial<User>) {
    Object.assign(this, partial);

    if (this.roles) {
      this.roles = this.roles.map((role: Role): Role => {
        return new ResponseRoleDto(role) as Role;
      });
    }
  }
}
