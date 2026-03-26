import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { User } from '@app/user/entities/user.entity';

@Entity('roles')
export class Role {
  @PrimaryGeneratedColumn()
  id: string;

  @ApiProperty({ description: 'Role name' })
  @Column({ type: 'varchar', nullable: false, unique: true })
  name: string;

  @ApiProperty({ description: 'Role slug' })
  @Column({ type: 'varchar', nullable: false, unique: true })
  slug: string;

  @ApiProperty({ description: 'Role created at' })
  @Column({ type: 'timestamp', nullable: false })
  created_at: Date;

  @ApiProperty({ description: 'Role updated at' })
  @Column({ type: 'timestamp', nullable: false })
  updated_at: Date;

  @ApiProperty({ description: 'Role deleted at' })
  @Column({ type: 'timestamp', nullable: true })
  deleted_at?: Date;

  @ManyToMany((): typeof User => User, (user: User) => user.roles)
  users: User[];
}
